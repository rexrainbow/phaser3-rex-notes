import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import Methods from './methods/Methods.js';
import GetWrapText from '../../utils/text/GetWrapText.js';
import SetNoWrapText from '../../utils/text/SetNoWrapText.js';
import GetTypingString from './utils/GetTypingString.js';
import GetPlainText from '../../utils/text/GetPlainText.js';
import GetString from '../../utils/text/GetString.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextTyping extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.timer = null;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setTextWrapEnable(GetValue(o, 'wrap', false));
        this.setTypeMode(GetValue(o, 'typeMode', 0));
        this.setTypingSpeed(GetValue(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);

        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIndex = GetFastValue(o, 'typingIndex', 0);
        this.insertIndex = null;
        this.insertChar = null;

        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
            this.start(undefined, undefined, this.typingIndex, elapsed);
        }

        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.freeTimer();

        super.shutdown(fromScene);
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

    setTypingSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setTextWrapEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.textWrapEnable = enable;
        return this;
    }

    set text(value) {
        var text = GetString(value);
        if (this.textWrapEnable) {
            text = GetWrapText(this.parent, text);
        }

        this._text = text;
    }

    get text() {
        return this._text;
    }

    get isTyping() {
        return (this.getTimer() !== null);
    }

    get isLastChar() {
        return (this.typingIndex === this.textLength);
    }

    setTypingContent(text) {
        this.text = text;
        this.textLength = GetPlainText(this.parent, this.text).length;
        return this;
    }

    onTyping() {
        var newText = GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);

        this.setText(newText);

        this.emit('typechar', this.insertChar);
        this.emit('type');

        if (this.isLastChar) {
            this.freeTimer();
            // Fire 'complete' next tick, to render last character on screen
            this.scene.sys.events.once('preupdate', function () {
                this.emit('complete', this, this.parent);
            }, this);
        } else {
            this.timer.delay = this.speed; // delay of next typing            
            this.typingIndex++;
        }
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
            delay: 0.0001,
            startAt: startAt,
            loop: true,
            callback: this.onTyping,
            callbackScope: this
        });
        // Note: Throw error message if delay is 0 with repeat/loop

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
                text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
            } else {
                text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
            }
        }

        if (this.textWrapEnable) {
            SetNoWrapText(this.parent, text);
        } else {
            this.parent.setText(text);
        }
    }
}

const TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
};

Object.assign(
    TextTyping.prototype,
    Methods
)


export default TextTyping;