import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import DefaultValueConverter from '../../../utils/string/TypeConvert.js';
import ParseValue from './ParseValue.js';

const DefaultTagExpression = `[!$a-z0-9-_.]+`;
const DefaultValueExpression = `[ !$a-z0-9-_.#,|&]+`;
const BypassValueConverter = function (s) { return s; }

class BracketParser {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        // Parameters for regex
        this.setTagExpression(GetValue(config, 'regex.tag', DefaultTagExpression));
        this.setValueExpression(GetValue(config, 'regex.value', DefaultValueExpression));
        // Value convert
        this.setValueConverter(GetValue(config, 'valueConvert', true));
        // Brackets and generate regex
        var delimiters = GetValue(config, 'delimiters', '<>');
        this.setDelimiters(delimiters[0], delimiters[1]);
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

    setTagExpression(express) {
        this.tagExpression = express;
        return this;
    }

    setValueExpression(express) {
        this.valueExpression = express;
        return this;
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

    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);
        var tagOn = `${delimiterLeft}(${this.tagExpression})(=(${this.valueExpression}))?${delimiterRight}`;
        var tagOff = `${delimiterLeft}\/(${this.tagExpression})${delimiterRight}`;

        this.reTagOn = RegExp(tagOn, 'i');
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp(`${tagOn}|${tagOff}`, 'gi');
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

            var match = regexResult[0];
            var matchEnd = this.reSplit.lastIndex;
            var matchStart = matchEnd - match.length;

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
            if (this.reTagOff.test(match)) {
                this.onTagEnd(match);
            } else {
                this.onTagStart(match);
            }

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

    onTagStart(tagContent) {
        var regexResult = tagContent.match(this.reTagOn);
        var tag = regexResult[1];
        var values = ParseValue(regexResult[3], this.valueConverter);

        this.skipEventFlag = false;
        this.emit(`+${tag}`, ...values);
        if (!this.skipEventFlag) {
            this.emit('+', tag, ...values);
        }

        this.lastTagStart = tag;
    }

    onTagEnd(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];

        this.skipEventFlag = false;
        this.emit(`-${tag}`);
        if (!this.skipEventFlag) {
            this.emit('-', tag);
        }

        this.lastTagEnd = tag;
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

    getTagOnRegString(tagExpression, valueExpression) {
        if (tagExpression === undefined) {
            tagExpression = this.tagExpression;
        }
        if (valueExpression === undefined) {
            valueExpression = this.valueExpression;
        }
        return `${EscapeRegex(this.delimiterLeft)}(${tagExpression})(=(${valueExpression}))?${EscapeRegex(this.delimiterRight)}`;
    }

    getTagOffRegString(tagExpression) {
        if (tagExpression === undefined) {
            tagExpression = this.tagExpression;
        }
        return `${EscapeRegex(this.delimiterLeft)}\/(${tagExpression})${EscapeRegex(this.delimiterRight)}`;
    }
}


Object.assign(
    BracketParser.prototype,
    EventEmitterMethods
);

export default BracketParser;