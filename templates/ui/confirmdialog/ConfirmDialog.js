import Dialog from '../dialog/Dialog.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateDisplayLabel from '../utils/build/CreateDisplayLabel.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ConfirmDialog extends Dialog {
    constructor(scene, config) {
        config = (config) ? DeepClone(config) : {};

        var creators = config.creators || {};

        var createBackground = GetValue(creators, 'background', CreateBackground);
        if (createBackground) {
            config.background = createBackground(scene, config.background);
        } else {
            delete config.background;
        }

        config.title = CreateDisplayLabel(scene, config.title, creators.title);

        config.content = CreateDisplayLabel(scene, config.content, creators.content);

        var buttonMode = config.buttonMode;
        if (buttonMode === undefined) {
            buttonMode = (!!config.buttonA && !!config.buttonB) ? 2 :
                (!!config.buttonA || !!config.button) ? 1 :
                    0;
        }

        var buttonAConfig = config.buttonA || config.button;
        var buttonACreator = creators.buttonA || creators.button;
        var buttonBConfig = config.buttonB || config.button;
        var buttonBCreator = creators.buttonB || creators.button;
        switch (buttonMode) {
            case 2:
                config.actions = [
                    CreateDisplayLabel(scene, buttonAConfig, buttonACreator),
                    CreateDisplayLabel(scene, buttonBConfig, buttonBCreator),
                ]
                break;

            case 1:
                config.actions = [
                    CreateDisplayLabel(scene, buttonAConfig, buttonACreator),
                ]
                break;

            default:
                config.actions = [];
                break;
        }

        super(scene, config);
        this.type = 'rexConfirmDialog';

        this.buttonMode = buttonMode;
    }

    resetDisplayContent(config) {
        if (config === undefined) {
            config = {};
        }

        var title = this.childrenMap.title;
        title.resetDisplayContent(config.title);

        var content = this.childrenMap.content;
        content.resetDisplayContent(config.content);

        var buttonA = this.childrenMap.actions[0];
        if (buttonA) {
            buttonA.resetDisplayContent(config.buttonA);
        }

        var buttonB = this.childrenMap.actions[1];
        if (buttonB) {
            buttonB.resetDisplayContent(config.buttonB);
        }

        return this;
    }

    modal(config, onClose) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        if (config === undefined) {
            config = {};
        }

        var zeroButtonMode = (this.buttonMode === 0);

        if (!config.hasOwnProperty('anyTouchClose')) {
            config.anyTouchClose = zeroButtonMode;
        }

        if (!config.hasOwnProperty('manualClose')) {
            config.manualClose = !zeroButtonMode;
        }

        super.modal(config, onClose);

        return this;
    }
}

export default ConfirmDialog;