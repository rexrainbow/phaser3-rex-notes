import GetSceneObject from '../../utils/system/GetSceneObject.js';
import CreateInputTextFromText from './CreateInputText.js';
import IsFunction from '../../utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextEdit {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.inputText = undefined;
        this.onClose = undefined;
        this.delayCall = undefined;
        this.boot();
    }

    boot() {
        this.gameObject.once('destroy', this.destroy, this);

        return this;
    }

    shutdown() {
        this.close();
        this.gameObject = undefined;
        this.scene = undefined;
        if (globLastOpenedEditor === this) {
            globLastOpenedEditor = undefined;
        }
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    open(config, onCloseCallback) {
        if (globLastOpenedEditor !== undefined) {
            globLastOpenedEditor.close();
        }

        globLastOpenedEditor = this;
        if (IsFunction(config)) {
            onCloseCallback = config;
            config = undefined;
        }
        if (onCloseCallback === undefined) {
            onCloseCallback = GetValue(config, 'onClose', undefined);
        }

        var customOnTextChanged = GetValue(config, 'onTextChanged', undefined);

        this.inputText = CreateInputTextFromText(this.gameObject, config)
            .on('textchange', function (inputText) {
                var text = inputText.text;
                if (customOnTextChanged) { // Custom on-text-changed callback
                    customOnTextChanged(this.gameObject, text);
                } else { // Default on-text-changed callback
                    this.gameObject.text = text;
                }
            }, this)
            .setFocus();
        this.gameObject.setVisible(false); // Set parent text invisible

        // Attach close event
        this.onClose = onCloseCallback;
        this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
        // Attach pointerdown (outside of input-text) event, at next tick
        this.delayCall = this.scene.time.delayedCall(0, function () {
            this.scene.input.once('pointerdown', this.close, this);
        }, [], this);
        return this;
    }

    close() {
        globLastOpenedEditor = undefined;
        if (!this.inputText) {
            return this;
        }

        this.gameObject.setVisible(true); // Set parent text visible

        this.inputText.destroy();
        this.inputText = undefined;
        if (this.delayCall) {
            this.delayCall.remove();
            this.delayCall = undefined;
        }

        // Remove close event
        this.scene.input.keyboard.off('keydown-ENTER', this.close, this);
        this.scene.input.off('pointerdown', this.close, this);

        if (this.onClose) {
            this.onClose(this.gameObject);
        }
        return this;
    }

    get isOpened() {
        return (this.inputText !== undefined);
    }

    get text() {
        return (this.isOpened) ? this.inputText.text : this.gameObject.text;
    }
}

var globLastOpenedEditor = undefined;

export default TextEdit;