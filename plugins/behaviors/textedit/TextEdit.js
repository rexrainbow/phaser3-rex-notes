import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import CreateInputTextFromText from './CreateInputText.js';
import IsFunction from '../../utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextEdit extends ComponentBase {
    constructor(gameObject) {
        // No event emitter
        super(gameObject, { eventEmitter: false });
        // this.parent = gameObject;

        this.inputText = undefined;
        this.onClose = undefined;
        this.delayCall = undefined;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.close();
        if (globLastOpenedEditor === this) {
            globLastOpenedEditor = undefined;
        }

        super.shutdown(fromScene);
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

        var onOpenCallback = GetValue(config, 'onOpen', undefined);
        var customOnTextChanged = GetValue(config, 'onTextChanged', undefined);

        this.inputText = CreateInputTextFromText(this.parent, config)
            .on('textchange', function (inputText) {
                var text = inputText.text;
                if (customOnTextChanged) { // Custom on-text-changed callback
                    customOnTextChanged(this.parent, text);
                } else { // Default on-text-changed callback
                    this.parent.text = text;
                }
            }, this)
            .setFocus();
        this.parent.setVisible(false); // Set parent text invisible

        // Attach close event
        this.onClose = onCloseCallback;
        if (GetValue(config, 'enterClose', true)) {
            this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
        }
        // Attach pointerdown (outside of input-text) event, at next tick
        this.delayCall = this.scene.time.delayedCall(0, function () {
            this.scene.input.once('pointerdown', this.close, this);

            // Open editor completly, invoke onOpenCallback
            if (onOpenCallback) {
                onOpenCallback(this.parent)
            }

        }, [], this);

        return this;
    }

    close() {
        globLastOpenedEditor = undefined;
        if (!this.inputText) {
            return this;
        }

        this.parent.setVisible(true); // Set parent text visible

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
            this.onClose(this.parent);
        }
        return this;
    }

    get isOpened() {
        return (this.inputText !== undefined);
    }

    get text() {
        return (this.isOpened) ? this.inputText.text : this.parent.text;
    }
}

var globLastOpenedEditor = undefined;

export default TextEdit;