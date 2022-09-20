import InputText from '../inputtext/InputText.js';
import IsPointerInHitArea from '../../../utils/input/IsPointerInHitArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HiddenInputTextBase extends InputText {
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

        this.setEnterCloseEnable(GetValue(config, 'enterClose', true));

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
                this.initText();

                if (this.enterCloseEnable) {
                    this.scene.input.keyboard.once('keydown-ENTER', this.setBlur, this);
                }

                // There is no cursor-position-change event, 
                // so updating cursor position every tick
                this.scene.sys.events.on('postupdate', this.updateText, this);

                this.scene.input.on('pointerdown', this.onClickOutside, this);

                if (this.onOpenCallback) {
                    this.onOpenCallback(this.textObject, this);
                }

            }, this)
            .on('blur', function () {
                this.updateText();

                this.scene.sys.events.off('postupdate', this.updateText, this);

                this.scene.input.off('pointerdown', this.onClickOutside, this);

                if (this.onCloseCallback) {
                    this.onCloseCallback(this.textObject, this);
                }
            }, this)

    }

    preDestroy() {
        this.textObject.off('pointerdown', this.setFocus, this);
        this.textObject.off('destroy', this.destroy, this);

        this.scene.sys.events.off('postupdate', this.updateText, this);

        this.scene.input.off('pointerdown', this.onClickOutside, this);

        super.preDestroy();
    }

    onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.textObject, pointer)) {
            this.setBlur();
        }
    }

    setEnterCloseEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enterCloseEnable = enable;
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

    // Override
    initText() {
    }

    // Override
    updateText() {
    }

}

const UpdateTextModes = {
    everyTick: 0,
    textChange: 1
}

export default HiddenInputTextBase;