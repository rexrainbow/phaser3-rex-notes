import Dialog from '../dialog/Dialog.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateDisplayLabel from '../utils/build/CreateDisplayLabel.js';
import CreateContent from './methods/CreateContent.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';
import HasValue from '../../../plugins/utils/object/HasValue.js';
import TextArea from '../textarea/TextArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ConfirmDialog extends Dialog {
    constructor(scene, config, creators) {
        config = (config) ? DeepClone(config) : {};

        if (creators === undefined) {
            creators = {};
        }

        var createBackground = GetValue(creators, 'background', CreateBackground);
        if (createBackground) {
            config.background = createBackground(scene, config.background);
        } else {
            delete config.background;
        }

        config.title = CreateDisplayLabel(scene, config.title, creators.title);

        config.content = CreateContent(scene, config.content, creators.content);
        if (config.content instanceof TextArea) {
            if (HasValue(config, 'height') && !HasValue(config, 'proportion.content')) {
                SetValue(config, 'proportion.content', 1);
            }
        }

        var buttonMode = config.buttonMode;
        if (buttonMode === undefined) {
            buttonMode = (!!config.buttonA && !!config.buttonB) ? 2 :
                (!!config.buttonA || !!config.button) ? 1 :
                    0;
        }

        var buttonAConfig = config.buttonA || config.button;
        var buttonACreators = creators.buttonA || creators.button;
        var buttonBConfig = config.buttonB || config.button;
        var buttonBCreators = creators.buttonB || creators.button;
        switch (buttonMode) {
            case 2:
                config.actions = [
                    CreateDisplayLabel(scene, buttonAConfig, buttonACreators),
                    CreateDisplayLabel(scene, buttonBConfig, buttonBCreators),
                ]
                break;

            case 1:
                config.actions = [
                    CreateDisplayLabel(scene, buttonAConfig, buttonACreators),
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
        if (content.resetDisplayContent) {
            // Label
            content.resetDisplayContent(config.content);
        } else {
            // TextArea
            var text = config.content || '';
            content.setText(text)
        }

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