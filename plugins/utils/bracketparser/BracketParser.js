import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import GetValue from '../object/GetValue.js';
import EscapeRegex from '../string/EscapeRegex.js';

class BracketParser {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        var brackets = GetValue(config, 'brackets', '[]');
        this.setBrackets(brackets[0], brackets[1]);

        this.isPaused = false;
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

    start(source) {
        this
            .setSource(source)
            .restart();
        return this;
    }

    restart() {
        this.progressIndex = 0;
        this.reSplit.lastIndex = 0;
        this.next();
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
                this.onTagOff(match);
            } else if (this.reTagOn.test(match)) {
                this.onTagOn(match);
            } else {
                this.onTagOnWithValue(match);
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
    }

    onTagOn(tagContent) {
        var tag = tagContent.match(this.reTagOn)[1];
        this.emit('on-*', tag);
        this.emit(`on-${tag}`);
    }

    onTagOnWithValue(tagContent) {
        var regexResult = tagContent.match(this.reTagOnWithValue);
        var tag = regexResult[1];
        var value = regexResult[2];
        this.emit('on-*', tag, value);
        this.emit(`on-${tag}`, value);
    }

    onTagOff(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];
        this.emit('off-*', tag);
        this.emit(`off-${tag}`);
    }

    onComplete() {
        this.emit('complete');
        this.progressIndex = 0;
    }
}

Object.assign(
    BracketParser.prototype,
    EventEmitterMethods
);

export default BracketParser;