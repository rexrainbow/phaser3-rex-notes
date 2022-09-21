import HiddenInputTextBase from './HiddenInputTextBase.js';
import NumberInputUpdateCallback from './defaultcallbacks/NumberInputUpdateCallback.js';
import GetTickDelta from '../../../utils/system/GetTickDelta.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Wrap = Phaser.Math.Wrap;

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.onUpdate === 'number') {
            config.onUpdate = NumberInputUpdateCallback;
        }

        super(textObject, config);
        // Note: Don't add this game object into scene

        this.setCursor(GetValue(config, 'cursor', '|'));
        this.setCursorFlashDuration(GetValue(config, 'cursorFlashDuration', 1000));
        this.cursorFlashTimer = 0;

    }

    initText() {
        this.cursorFlashTimer = 0;
        this.prevCursorPosition = undefined;
        this.setText(this.textObject.text);
        this.setCursorPosition();

        return this;
    }

    updateText() {
        var text = this.text;

        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, this.textObject, this);
            if (newText != null) {
                text = newText;
            }
        }

        if (this.isFocused && this.hasCursor) {
            // Insert Cursor
            var cursorPosition = this.cursorPosition;
            text = text.substring(0, cursorPosition) + this.cursor + text.substring(cursorPosition);

            if (this.prevCursorPosition !== cursorPosition) {
                // console.log(cursorPosition);
                this.prevCursorPosition = cursorPosition;
            }
        }

        this.textObject.setText(text);

        return this;
    }

    setCursor(s) {
        this._cursor = s;
        this.hasCursor = s && (s !== '');
        return s;
    }

    setCursorFlashDuration(duration) {
        this.cursorFlashDuration = duration;
        return this;
    }

    get cursor() {
        if (!this._isFocused) {
            return this._cursor;
        }

        // Flash Cursor
        var cursor;
        if (this.cursorFlashTimer < (this.cursorFlashDuration / 2)) {
            cursor = this._cursor;
        } else {
            cursor = ' ';
        }

        var timerValue = this.cursorFlashTimer + GetTickDelta(this.scene);
        this.cursorFlashTimer = Wrap(timerValue, 0, this.cursorFlashDuration);
        return cursor;
    }

}

export default HiddenInputText;