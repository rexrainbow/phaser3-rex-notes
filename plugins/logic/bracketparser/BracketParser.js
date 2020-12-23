import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import EscapeRegex from '../../utils/string/EscapeRegex.js';

class BracketParser {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        var brackets = GetValue(config, 'brackets', '[]');
        this.setBrackets(brackets[0], brackets[1]);

        this.isPaused = false;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
    }

    setBrackets(bracketLeft, bracketRight) {
        if (bracketRight === undefined) {
            bracketRight = bracketLeft[1];
            bracketLeft = bracketLeft[0];
        }
        this.bracketLeft = bracketLeft;
        this.bracketRight = bracketRight;

        bracketLeft = EscapeRegex(bracketLeft);
        bracketRight = EscapeRegex(bracketRight);
        var tagOn = `${bracketLeft}([a-z0-9]+)${bracketRight}`;
        var tagOnWithValue = `${bracketLeft}([a-z0-9]+)=([a-z0-9,#]+)${bracketRight}`;
        var tagOff = `${bracketLeft}\/([a-z0-9]+)${bracketRight}`;

        this.reTagOn = RegExp(tagOn, 'i');
        this.reTagOnWithValue = RegExp(tagOnWithValue, 'i');
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp(`${tagOn}|${tagOnWithValue}|${tagOff}`, 'gi');
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
        this.isPaused = false;
        var text = this.source,
            lastIndex = text.length;

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
            } else if (this.reTagOn.test(match)) {
                this.onTagStart(match);
            } else {
                this.onTagStartWithValue(match);
            }

            this.progressIndex = this.reSplit.lastIndex;
        }

    }

    pause() {
        this.isPaused = true;
        return this;
    }

    onContent(content) {
        this.emit('content', content);
        this.lastContent = content;
    }

    onTagStart(tagContent) {
        var tag = tagContent.match(this.reTagOn)[1];
        this.emit('+', tag);
        this.emit(`+${tag}`);
        this.lastTagStart = tag;
    }

    onTagStartWithValue(tagContent) {
        var regexResult = tagContent.match(this.reTagOnWithValue);
        var tag = regexResult[1];
        var value = regexResult[2];
        this.emit('+', tag, value);
        this.emit(`+${tag}`, value);
        this.lastTagStart = tag;
    }

    onTagEnd(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];
        this.emit('-', tag);
        this.emit(`-${tag}`);
        this.lastTagEnd = tag;
    }

    onComplete() {
        this.emit('complete');
        this.resetIndex();
    }
}

Object.assign(
    BracketParser.prototype,
    EventEmitterMethods
);

export default BracketParser;