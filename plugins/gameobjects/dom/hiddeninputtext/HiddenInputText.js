import InputText from '../inputtext/InputText.js';
import IsPointerInHitArea from '../../../utils/input/IsPointerInHitArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

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

        this.setUpdateTextCallback(
            GetValue(config, 'updateTextCallback', undefined),
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
}

export default HiddenInputText;