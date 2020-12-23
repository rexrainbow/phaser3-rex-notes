import GetValue from '../object/GetValue.js';
import NOOP from '../object/NOOP.js';

class BracketParser {
    constructor(config) {
        var bracket = GetValue(config, 'bracket', '[]');
        this.setBracket(bracket[0], bracket[1]);
        this.setOnContentCallback(
            GetValue(config, 'onContentCallback', NOOP),
            GetValue(config, 'onContentCallbackScope', null),
        );
        this.setOnTagOnCallback(
            GetValue(config, 'onTagOnCallback', NOOP),
            GetValue(config, 'onTagOnCallbackScope', null),
        );
        this.setOnTagOffCallback(
            GetValue(config, 'onTagOffCallback', NOOP),
            GetValue(config, 'onTagOffCallbackScope', null),
        );
    }

    setBracket(bracketLeft, bracketRight) {
        this.bracketLeft = bracketLeft;
        this.bracketRight = bracketRight;
        return this;
    }

    setOnContentCallback(callback, scope) {
        this.onContentCallback = callback;
        this.onContentCallbackScope = scope;
        return this;
    }

    setOnTagOnCallback(callback, scope) {
        this.onTagOnCallback = callback;
        this.onTagOnCallbackScope = scope;
        return this;
    }

    setOnTagOffCallback(callback, scope) {
        this.onTagOffCallback = callback;
        this.onTagOffCallbackScope = scope;
        return this;
    }

    parse(text) {
        var bracketLeft = TransferWord(this.bracketLeft);
        var bracketRight = TransferWord(this.bracketRight);
        var tagOn = `${bracketLeft}[a-z0-9]+${bracketRight}`;
        var tagOff = `${bracketLeft}\/[a-z0-9]+${bracketRight}`
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp(`${tagOn}|${tagOff}`, 'gi');

        var arr, m, content,
            charIdx = 0,
            totalLen = text.length,
            matchStart = totalLen;
        while (true) {
            arr = this.reSplit.exec(text);
            if (!arr) {
                break;
            }

            m = arr[0];
            matchStart = this.reSplit.lastIndex - m.length;

            if (charIdx < matchStart) {
                content = text.substring(charIdx, matchStart);
                if (this.onContentCallbackScope) {
                    this.onContentCallback.call(this.onContentCallbackScope, content);
                } else {
                    this.onContentCallback(content);
                }
            }

            if (this.reTagOff.test(m)) {
                if (this.onTagOffCallbackScope) {
                    this.onTagOffCallback.call(this.onTagOffCallbackScope, content);
                } else {
                    this.onTagOffCallback(m);
                }
            } else {
                if (this.onTagOnCallbackScope) {
                    this.onTagOnCallback.call(this.onTagOnCallbackScope, content);
                } else {
                    this.onTagOnCallback(m);
                }
            }

            charIdx = this.reSplit.lastIndex;
        }

        if (charIdx < totalLen) {
            console.log(text.substring(charIdx, totalLen));
        }
    }
}

var TransferCharacter = function (c) {
    if ((c === '[') || (c === ']') || (c === '{') || (c === '}')) {
        return `\\${c}`;
    } else {
        return c;
    }
}

var TransferWord = function (w) {
    if (w.length == 1) {
        return TransferCharacter(w);
    } else {
        return w.split('').map(TransferCharacter).join('');
    }
}

export default BracketParser;