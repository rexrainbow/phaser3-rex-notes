import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextTyping {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);        
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        
        this.timer = null;
        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setTypeMode(GetValue(o, 'typeMode', 0));
        this.setTypeSpeed(GetValue(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);

        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.text = transferText(GetFastValue(o, 'text', ''));
        this.textLen = GetFastValue(o, 'textLen', 0);
        this.insertIdx = GetFastValue(o, 'insertIdx', null);

        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
            this.start(undefined, undefined, this.typingIdx, elapsed);
        }

        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var elapsed;
        var timer = this.getTimer();
        if (timer) {
            elapsed = timer.elapsed;
        } else {
            elapsed = null;
        }

        return {
            typeMode: this.typeMode,
            speed: this.speed,
            setTextCallback: this.setTextCallback,
            setTextCallbackScope: this.setTextCallbackScope,

            typingIdx: this.typingIdx,
            text: this.text,
            textLen: this.textLen,
            insertIdx: this.insertIdx,
            elapsed: elapsed
        };
    }

    boot() {
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.once('destroy', this.destroy, this);
        }

        return this;
    }

    shutdown() {
        this.destroyEventEmitter();
        this.freeTimer();
        this.gameObject = undefined;
        this.scene = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setTypeMode(m) {
        if (typeof (m) === 'string') {
            m = TYPEMODE[m];
        }
        this.typeMode = m;
        return this;
    }

    setTypeSpeed(speed) {
        this.speed = speed;
        return this;
    }

    get isTyping() {
        return (this.getTimer() !== null);
    }

    get isLastChar() {
        return (this.typingIdx === this.textLen);
    }

    start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
            this.setTypingContent(text);
        }
        if (speed !== undefined) {
            this.speed = speed;
        }
        if (startIdx === undefined) {
            startIdx = 0;
        }

        this.typingIdx = startIdx + 1;
        if (this.speed === 0) {
            this.stop(true);
        } else {
            this.startTimer(timerStartAt);
        }

        return this;
    }

    appendText(text) {
        var newText = this.text.concat(transferText(text));
        if (this.isTyping) {
            this.setTypingContent(newText);
        } else {
            this.start(newText, undefined, this.textLen);
        }

        return this;
    }

    stop(showAllText) {
        var timer = this.getTimer();
        if (timer) {
            this.freeTimer();
        }
        if (showAllText) {
            this.typingIdx = this.textLen;
            this.setText(this.text);
            this.emit('type');
            this.emit('complete', this, this.gameObject);
        }

        return this;
    }

    pause() {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = true;
        }
        return this;
    }

    resume() {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = false;
        }
        return this;
    }

    setTypingContent(text) {
        this.text = transferText(text);
        this.textLen = this.getTextLength(this.text);
        return this;
    }

    onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('type');

        if (this.isLastChar) {
            this.freeTimer();
            this.emit('complete', this, this.gameObject);
        } else {
            this.timer.delay = this.speed; // delay of next typing            
            this.typingIdx++;
        }
    }

    getTypingString(text, typeIdx, textLen, typeMode) {
        var result;
        if (typeMode === 0) { //left-to-right
            var startIdx = 0;
            var endIdx = typeIdx;
            this.insertIdx = endIdx;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 1) { //right-to-left
            var endIdx = textLen;
            var startIdx = endIdx - typeIdx;
            this.insertIdx = 0;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 2) { //middle-to-sides
            var midIdx = textLen / 2;
            var startIdx = Math.floor(midIdx - (typeIdx / 2));
            var endIdx = startIdx + typeIdx;
            this.insertIdx = (typeIdx % 2) ? typeIdx : 0;
            result = this.getSubString(text, startIdx, endIdx);

        } else if (typeMode === 3) { //sides-to-middle
            var lowerLen = Math.floor(typeIdx / 2);
            var lowerResult;
            if (lowerLen > 0) {
                var endIdx = textLen;
                var startIdx = endIdx - lowerLen;
                lowerResult = this.getSubString(text, startIdx, endIdx);
            } else {
                lowerResult = "";
            }

            var upperLen = typeIdx - lowerLen;
            var upperResult;
            if (upperLen > 0) {
                var startIdx = 0;
                var endIdx = startIdx + upperLen;
                this.insertIdx = endIdx;
                upperResult = this.getSubString(text, startIdx, endIdx);
            } else {
                upperResult = "";
                this.insertIdx = 0;
            }
            result = upperResult + lowerResult;
        }

        return result;
    }

    startTimer(timerStartAt) {
        if (this.timer) {
            this.freeTimer();
        }
        var delay, startAt;
        if (timerStartAt === undefined) {
            delay = 0;
            startAt = 0;
        } else {
            delay = this.speed;
            startAt = timerStartAt;
        }

        this.timer = this.scene.time.addEvent({
            delay: 0,
            startAt: startAt,
            loop: true,
            callback: this.onTyping,
            callbackScope: this
        });
        return this;
    }

    getTimer() {
        return this.timer;
    }

    freeTimer() {
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }

        return this;
    }

    setText(text) {
        if (this.setTextCallback) {
            if (this.setTextCallbackScope) {
                text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
            } else {
                text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
            }
        }
        this.gameObject.setText(text);
    }

    getTextLength(text) {
        var gameObject = this.gameObject;
        var len;
        if (gameObject.getPlainText) {
            len = gameObject.getPlainText(text).length;
        } else {
            len = text.length;
        }

        return len;
    }

    getSubString(text, startIdx, endIdx) {
        var gameObject = this.gameObject;
        var result;
        if (gameObject.getSubString) {
            result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
            result = text.slice(startIdx, endIdx);
        }

        return result;
    }
}

Object.assign(
    TextTyping.prototype,
    EventEmitterMethods
);

var transferText = function (text) {
    if (Array.isArray(text)) {
        text = text.join('\n');
    } else if (typeof (text) === 'number') {
        text = text.toString();
    }
    return text;
}

/** @private */
const TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
};


export default TextTyping;