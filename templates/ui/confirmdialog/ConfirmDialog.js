import Dialog from '../dialog/Dialog.js';
import ResetDisplayContent from './methods/ResetDisplayContent.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateLabel from '../utils/build/CreateLabel.js';
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

        config.title = CreateLabel(scene, config.title, creators.title);

        config.content = CreateContent(scene, config.content, creators.content);
        if (config.content instanceof TextArea) {
            if (HasValue(config, 'height') && !HasValue(config, 'proportion.content')) {
                SetValue(config, 'proportion.content', 1);
            }
        }

        var defaultButtonConfig = config.button;
        var buttonAConfig = config.buttonA || defaultButtonConfig;
        var buttonBConfig = config.buttonB || defaultButtonConfig;
        var buttonMode = config.buttonMode;
        if (buttonMode === undefined) {
            buttonMode = (!!buttonAConfig && !!buttonBConfig) ? 2 :
                (!!buttonAConfig) ? 1 :
                    0;
        }

        var defaultButtonCreator = creators.button;
        var buttonACreators = creators.buttonA || defaultButtonCreator;
        var buttonBCreators = creators.buttonB || defaultButtonCreator;
        switch (buttonMode) {
            case 2:
                config.actions = [
                    CreateLabel(scene, buttonAConfig, buttonACreators),
                    CreateLabel(scene, buttonBConfig, buttonBCreators),
                ]
                break;

            case 1:
                config.actions = [
                    CreateLabel(scene, buttonAConfig, buttonACreators),
                ]
                break;

            case 0:
                break;

            default:
                config.actions = [];
                break;
        }

        var defaultChoiceConfig = config.choice;
        if (defaultChoiceConfig) {
            config.choices = [];
        }

        super(scene, config);
        this.type = 'rexConfirmDialog';

        this.buttonMode = buttonMode;

        this.defaultActionConfig = defaultButtonConfig;
        this.defaultActionButtonCreator = defaultButtonCreator;

        this.defaultChoiceConfig = defaultChoiceConfig;
        this.defaultChoiceCreator = creators.choice;

        var buttons = this.childrenMap.actions;
        this.addChildrenMap('buttonA', (buttons) ? buttons[0] : null);
        this.addChildrenMap('buttonB', (buttons) ? buttons[1] : null);

        // Interactive
        this
            .on('action.over', function (button, index, pointer, event) {
                if (button.setHoverState) {
                    button.setHoverState(true);
                }
            })
            .on('action.out', function (button, index, pointer, event) {
                if (button.setHoverState) {
                    button.setHoverState(false);
                }
            })
            .on('choice.over', function (button, index, pointer, event) {
                if (button.setHoverState) {
                    button.setHoverState(true);
                }
            })
            .on('choice.out', function (button, index, pointer, event) {
                if (button.setHoverState) {
                    button.setHoverState(false);
                }
            })
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

var Methods = {
    resetDisplayContent: ResetDisplayContent,
}

Object.assign(
    ConfirmDialog.prototype,
    Methods
)

export default ConfirmDialog;