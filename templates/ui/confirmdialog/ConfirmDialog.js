import Dialog from '../dialog/Dialog.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateDisplayLabel from '../utils/build/CreateDisplayLabel.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';

class ConfirmDialog extends Dialog {
    constructor(scene, config) {
        config = (config) ? DeepClone(config) : {};

        config.background = CreateBackground(scene, config.background);

        config.title = CreateDisplayLabel(scene, config.title);

        config.content = CreateDisplayLabel(scene, config.content);

        var buttonMode = config.buttonMode;
        if (buttonMode === undefined) {
            buttonMode = (!!config.buttonA && !!config.buttonB) ? 2 :
                (!!config.buttonA || !!config.button) ? 1 :
                    0;
        }

        switch (buttonMode) {
            case 2:
                config.actions = [
                    CreateDisplayLabel(scene, config.buttonA || config.button),
                    CreateDisplayLabel(scene, config.buttonB || config.button),
                ]
                break;

            case 1:
                config.actions = [
                    CreateDisplayLabel(scene, config.buttonA || config.button),
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