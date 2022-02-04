import InputText from '../inputtext/InputText.js';
import IsPointerInHitArea from '../../../utils/input/IsPointerInHitArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Wrap = Phaser.Math.Wrap;

class HiddenInputText extends InputText {
    constructor(textObject, config) {
        super(textObject.scene, config);
        // Note: Don't add this game object into scene

        // Set style
        var style = this.node.style;
        style.zIndex = 0;
        // hide native blue text cursor on iOS
        style.transform = 'scale(0)';

        this.setCursor(GetValue(config, 'cursor', '|'));
        this.setCursorFlashDuration(GetValue(config, 'cursorFlashDuration', 1000));
        this.cursorFlashTimer = 0;

        this.setUpdateTextCallback(
            GetValue(config, 'updateTextCallback', DefaultUpdateTextCallback),
            GetValue(config, 'updateTextCallbackScope', undefined)
        );

        this.textObject = textObject;
        textObject
            .setInteractive()
            .on('pointerdown', this.setFocus, this)
            .on('destroy', this.destroy, this)

        this
            .on('focus', function () {
                this.scene.events.on('postupdate', this.updateText, this);
                this.scene.input.on('pointerdown', this.onClickOutside, this);
            }, this)
            .on('blur', function () {
                this.updateText();
                this.cursorFlashTimer = 0;

                this.scene.events.off('postupdate', this.updateText, this);
                this.scene.input.off('pointerdown', this.onClickOutside, this);
            }, this)
    }

    preDestroy() {
        this.textObject.off('pointerdown', this.setFocus, this);
        this.textObject.off('destroy', this.destroy, this);
        this.scene.events.off('postupdate', this.updateText, this);
        this.scene.input.off('pointerdown', this.onClickOutside, this);

        super.preDestroy();
    }

    onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.textObject, pointer)) {
            this.setBlur();
        }
    }

    updateText() {
        var newText = this.text;
        var callback = this.updateTextCallback,
            scope = this.updateTextCallbackScope;
        if (callback) {
            if (scope) {
                newText = callback.call(scope, newText, this);
            } else {
                newText = callback(newText, this);
            }
        }
        this.textObject.setText(newText);
        return this;
    }

    setUpdateTextCallback(callback, scope) {
        this.updateTextCallback = callback;
        this.updateTextCallbackScope = scope;
        return this;
    }

    setCursor(s) {
        this._cursor = s;
        return s;
    }

    setCursorFlashDuration(duration) {
        this.cursorFlashDuration = duration;
        return this;
    }

    get cursor() {
        var cursor;
        if (this.cursorFlashTimer < (this.cursorFlashDuration / 2)) {
            cursor = this._cursor;
        } else {
            cursor = ' ';
        }

        var timerValue = this.cursorFlashTimer + this.scene.game.loop.delta;
        this.cursorFlashTimer = Wrap(timerValue, 0, this.cursorFlashDuration);
        return cursor;
    }
}

var DefaultUpdateTextCallback = function (text, hiddenInputText) {
    if (hiddenInputText.isFocused) {
        var cursorPosition = hiddenInputText.cursorPosition;
        return text.substring(0, cursorPosition) + hiddenInputText.cursor + text.substring(cursorPosition);
    } else {
        return text;
    }
}

export default HiddenInputText;