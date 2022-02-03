import InputText from '../inputtext/InputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HiddenInputText extends InputText {
    constructor(textObject, config) {
        super(
            textObject.scene,
            textObject.x, textObject.y,
            textObject.displayWidth, textObject.displayHeight,
            config
        );
        // Note: Don't add this game object into scene

        // Set style
        var style = this.node.style;
        style.position = 'absolute';
        style.opacity = 0;
        style.pointerEvents = 'none';
        style.zIndex = 0;
        // hide native blue text cursor on iOS
        style.transform = 'scale(0)';

        this.textObject = textObject;
        this.setOrigin(textObject.originX, textObject.originY);
        this.setText(textObject.text);
        textObject.once('destroy', this.destroy, this);

        this.setUpdateTextCallback(
            GetValue(config, 'updateTextCallback', undefined),
            GetValue(config, 'updateTextCallbackScope', undefined)
        );

        this.delayCall = undefined;

        // Start edit when click text game object
        textObject
            .setInteractive()
            .on('pointerdown', function () {
                this.setFocus();
            }, this)

        this.scene.events.on('postupdate', this.update, this);

        this
            .on('focus', function () {
                this.updateText();

                // Attach pointerdown (outside of input-text) event, at next tick
                this.delayCall = this.scene.time.delayedCall(0, function () {
                    this.scene.input.once('pointerdown', this.setBlur, this);
                }, [], this);

            }, this)
            .on('blur', function () {
                this.updateText();
            }, this)
    }

    preDestroy() {
        this.scene.events.off('postupdate', this.update, this);

        if (this.delayCall) {
            this.delayCall.remove();
            this.delayCall = undefined;
        }

        super.preDestroy();
    }

    update() {
        var textObject = this.textObject;

        if ((this.x !== textObject.x) || (this.y !== textObject.y)) {
            this.setPosition(textObject.x, textObject.y);
        }

        if ((this.width !== textObject.displayWidth) || (this.height !== textObject.displayHeight)) {
            this.resize(textObject.displayWidth, textObject.displayHeight);
        }

        var newText = this.text;
        if (newText !== this.prevText) {
            this.prevText = newText;
            this.updateText();
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