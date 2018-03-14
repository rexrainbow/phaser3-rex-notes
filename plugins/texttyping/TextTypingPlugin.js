'use strict'

import Phaser from 'phaser';
import EE from 'eventemitter3';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class TextTypingPlugin extends EE{
    constructor(gameobject, config) {
        super();

        this.gameobject = gameobject;
        this.scene = gameobject.scene;
        this.boot();

        this.timer = null;
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setTypeMode(GetFastValue(o, 'typeMode', 0));
        this.setTypeSpeed(GetFastValue(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);        

        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.text = GetFastValue(o, 'text', '');
        this.textLen = GetFastValue(o, 'textLen', 0);
        this.insertIdx = GetFastValue(o, 'insertIdx', null);

        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
            this.start(undefined, undefined, this.typingIdx, elapsed);
        }
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
        var eventEmitter = this.gameobject;
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }

    }

    shutdown() {
        this.freeTimer();
        this.removeAllListeners();
    }

    destroy() {
        this.shutdown();
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

    }

    appendText(text) {
        var newText = this.text + text;
        if (this.isTyping) {
            this.setTypingContent(newText);
        } else {
            this.start(newText, undefined, this.textLen);
        }
    }

    stop(showAllText) {
        var timer = this.getTimer();
        if (timer) {
            this.freeTimer();
        }
        if (showAllText) {
            this.typingIdx = this.textLen;
            var newText = this.getSubString(this.text, 0, this.typingIdx);
            this.setText(newText);
            this.emit('typing');
            this.emit('typingcompleted');
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
        this.text = text;
        this.textLen = this.getTextLength(text);
    }

    onTyping() {      
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('typing');

        if (this.isLastChar) {
            this.freeTimer();
            this.emit('typingcompleted');
        } else {
            this.timer.delay = this.speed;  // delay of next typing            
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
            text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
        }
        this.gameobject.setText(text);
    }

    getTextLength(text) {
        var gameobject = this.gameobject;
        var len;
        if (gameobject.getTextLength) {
            len = gameobject.getTextLength(text);
        } else {
            len = text.length;
        }

        return len;
    }

    getSubString(text, startIdx, endIdx) {
        var gameobject = this.gameobject;
        var result;
        if (gameobject.getSubString) {
            result = gameobject.getSubString(text, startIdx, endIdx);
        } else {
            result = text.slice(startIdx, endIdx);
        }

        return result;
    }
}

/** @private */
const TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
};


export default TextTypingPlugin;