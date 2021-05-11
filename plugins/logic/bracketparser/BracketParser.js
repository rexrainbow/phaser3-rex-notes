import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import EscapeRegex from '../../utils/string/EscapeRegex.js';
import DefaultValueConverter from '../../utils/string/TypeConvert.js';
import ParseValue from './ParseValue.js';

const DefaultTagExpression = `[a-z0-9-_.]+`;
const DefaultValueExpression = `[ #a-z-_.0-9,|&]+`;
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

        this.isRunning = false;
        this.isPaused = false;
        this.skipEventFlag = false;
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

        var text = this.source,
            lastIndex = text.length;

        if (this.reSplit.lastIndex === 0) {
            this.onStart();
        }
        while (!this.isPaused) {
            var regexResult = this.reSplit.exec(text);
            if (!regexResult) {
                if (this.progressIndex < lastIndex) {
                    this.onContent(text.substring(this.progressIndex, lastIndex));
                }
                this.onComplete();
                return;
            }

            var match = regexResult[0];
            var matchStart = this.reSplit.lastIndex - match.length;

            if (this.progressIndex < matchStart) {
                this.onContent(text.substring(this.progressIndex, matchStart));
            }

            if (this.reTagOff.test(match)) {
                this.onTagEnd(match);
            } else {
                this.onTagStart(match);
            }

            this.progressIndex = this.reSplit.lastIndex;
        }

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

    onContent(content) {
        this.emit('content', content);
        this.lastContent = content;
    }

    onTagStart(tagContent) {
        var regexResult = tagContent.match(this.reTagOn);
        var tag = regexResult[1];
        var value = regexResult[3];
        if (value !== undefined) { // Tag with value(s)
            value = ParseValue(value, this.valueConverter);
        }

        this.skipEventFlag = false;
        this.emit(`+${tag}`, value);
        if (!this.skipEventFlag) {
            this.emit('+', tag, value);
        }

        this.lastTagStart = tag;
    }

    onTagEnd(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];

        this.skipEventFlag = false;
        this.emit('-', tag);
        if (!this.skipEventFlag) {
            this.emit(`-${tag}`);
        }

        this.lastTagEnd = tag;
    }

    onStart() {
        this.isRunning = true;
        this.emit('start');
    }

    onComplete() {
        this.isRunning = false;
        this.emit('complete');
        this.resetIndex();
    }

    onPause() {
        this.isPaused = true;
        this.emit('pause');
    }

    onResume() {
        this.isPaused = false;
        this.emit('resume');
    }
}


Object.assign(
    BracketParser.prototype,
    EventEmitterMethods
);

export default BracketParser;