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
        style.position = 'absolute';
        style.opacity = 0;
        style.pointerEvents = 'none';
        style.zIndex = 0;
        // hide native blue text cursor on iOS
        style.transform = 'scale(0)';

        this.setCursor(GetValue(config, 'cursor', '|'));
        this.setCursorFlashDuration(GetValue(config, 'cursorFlashDuration', 1000));
        this.cursorFlashTimer = 0;

        this.setEnterClose(GetValue(config, 'enterClose', true));

        this.onOpenCallback = GetValue(config, 'onOpen', undefined);
        this.onCloseCallback = GetValue(config, 'onClose', undefined);
        this.onUpdateCallback = GetValue(config, 'onUpdate', undefined);

        this.textObject = textObject;
        textObject
            .setInteractive()
            .on('pointerdown', this.setFocus, this)
            .on('destroy', this.destroy, this);


        this
            .on('focus', function () {
                this.cursorFlashTimer = 0;

                if (this.enterClose) {
                    this.scene.input.keyboard.once('keydown-ENTER', this.setBlur, this);
                }

                this.setText(this.textObject.text);
                this.scene.events.on('postupdate', this.updateText, this);
                this.scene.input.on('pointerdown', this.onClickOutside, this);

                if (this.onOpenCallback) {
                    this.onOpenCallback(this.textObject, this);
                }

            }, this)
            .on('blur', function () {
                this.updateText();

                this.scene.events.off('postupdate', this.updateText, this);
                this.scene.input.off('pointerdown', this.onClickOutside, this);

                if (this.onCloseCallback) {
                    this.onCloseCallback(this.textObject, this);
                }
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
        var text = this.text;

        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, this.textObject, this);
            if (newText) {
                text = newText;
            }
        }

        if (this.isFocused && this.hasCursor) {
            // Insert Cursor
            var cursorPosition = this.cursorPosition;
            text = text.substring(0, cursorPosition) + this.cursor + text.substring(cursorPosition);
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

        var timerValue = this.cursorFlashTimer + this.scene.game.loop.delta;
        this.cursorFlashTimer = Wrap(timerValue, 0, this.cursorFlashDuration);
        return cursor;
    }

    setEnterClose(value) {
        if (value === undefined) {
            value = true;
        }
        this.enterClose = value;
        return this;
    }

    open() {
        this.setFocus();
        return this;
    }

    close() {
        this.setBlur();
        return this;
    }

    get isOpened() {
        return this._isFocused;
    }
}

export default HiddenInputText;