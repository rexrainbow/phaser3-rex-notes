import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import TokenExpressionMethods from './TokenExpressionMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import DefaultValueConverter from '../../../utils/string/TypeConvert.js';
import ParseValue from './ParseValue.js';

class BracketParser {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        // Brackets and generate regex
        var delimiters = GetValue(config, 'delimiters', '<>');
        this.setDelimiters(delimiters[0], delimiters[1]);
        // Value convert
        this.setValueConverter(GetValue(config, 'valueConvert', true));
        // Loop
        this.setLoopEnable(GetValue(config, 'loop', false));

        this.isRunning = false;
        this.isPaused = false;
        this.skipEventFlag = false;
        this.justCompleted = false;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setValueConverter(converter) {
        if (converter === true) {
            converter = DefaultValueConverter;
        } else if (!converter) {
            converter = BypassValueConverter;
        }
        this.valueConverter = converter;
        return this;
    }

    setLoopEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.loopEnable = enable;
        return this;
    }

    setSource(source) {
        this.source = source;
        return this;
    }

    resetIndex(index) {
        if (index === undefined) {
            index = 0;
        }
        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        this.justCompleted = false;
        this.isRunning = false;
        return this;
    }

    start(source) {
        this
            .setSource(source)
            .restart();
        return this;
    }

    restart() {
        this
            .resetIndex()
            .next();
    }

    next() {
        if (this.isPaused) {
            this.onResume();
        }

        // Don't re-enter this method
        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        if (this.justCompleted) {
            this.isRunning = false;
            return this;
        }

        if (this.reSplit.lastIndex === 0) {
            this.onStart();
        }

        var text = this.source,
            lastIndex = text.length;

        this.reSplit.lastIndex = this.progressIndex;
        while (true) {
            var regexResult = this.reSplit.exec(text);
            // No tag found, complete
            if (!regexResult) {
                if (this.progressIndex < lastIndex) {
                    this.onContent(text.substring(this.progressIndex, lastIndex));
                    // Might pause here
                    if (this.isPaused) {
                        this.progressIndex = lastIndex;
                        break;
                    }
                }
                this.onComplete();
                this.isRunning = false;
                return;
            }

            var matchEnd = this.reSplit.lastIndex;
            var matchStart = matchEnd - regexResult[0].length;

            // Process content between previous tag and current tag            
            if (this.progressIndex < matchStart) {
                this.onContent(text.substring(this.progressIndex, matchStart));
                // Might pause here
                if (this.isPaused) {
                    this.progressIndex = matchStart;
                    break;
                }
            }

            // Process current tag
            this.onTag(regexResult[1]);

            this.progressIndex = matchEnd;
            // Might pause here
            if (this.isPaused) {
                break;
            }

        }

        this.isRunning = false;
        return this;
    }

    skipEvent() {
        this.skipEventFlag = true;
        return this;
    }

    pause() {
        if (!this.isPaused) {
            this.onPause();
        }
        return this;
    }

    pauseUntilEvent(eventEmitter, eventName) {
        if (this.isPaused) {
            return this;
        }

        this.pause();
        eventEmitter.once(eventName, function () {
            this.next();
        }, this);
        return this;
    }

    onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
    }

    onTag(tagContent) {
        var tag = this.parseTag(tagContent);

        var isCloseTag = (tag.name.charAt(0) === '/');
        if (isCloseTag) {
            tag.name = tag.name.substring(1, tag.name.length);
        }

        var eventPrefix = (isCloseTag) ? '-' : '+';
        this.skipEventFlag = false;
        this.emit(`${eventPrefix}${tag.name}`, tag.payload);
        if (!this.skipEventFlag) {
            this.emit(eventPrefix, tag.name, tag.payload);
        }

        if (!isCloseTag) {
            this.lastTagStart = tag;
        } else {
            this.lastTagEnd = tag;
        }
    }

    onStart() {
        this.isRunning = true;
        this.emit('start', this);
    }

    onComplete() {
        this.isRunning = false;
        this.justCompleted = true;
        this.emit('complete', this);
        if (this.loopEnable) {
            this.resetIndex();
        }
    }

    onPause() {
        this.isPaused = true;
        this.emit('pause', this);
    }

    onResume() {
        this.isPaused = false;
        this.emit('resume', this);
    }

}

const BypassValueConverter = function (s) { return s; }

Object.assign(
    BracketParser.prototype,
    EventEmitterMethods,
    TokenExpressionMethods
);

export default BracketParser;