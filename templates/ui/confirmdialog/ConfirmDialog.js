import Dialog from '../dialog/Dialog.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateDisplayLabel from '../utils/build/CreateDisplayLabel.js';
import Methods from './methods/Methods.js';

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
}

Object.assign(
    ConfirmDialog.prototype,
    Methods,
)

export default ConfirmDialog;