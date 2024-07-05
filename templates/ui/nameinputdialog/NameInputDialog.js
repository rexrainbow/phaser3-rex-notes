import Dialog from '../dialog/Dialog.js';
import Methods from './methods/Methods.js';
import CreateContent from './methods/CreateContent.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateLabel from '../utils/build/CreateLabel.js';
import RegisterEvents from '../dialog/utils/RegisterSimpleLabelButtonEvents.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class NameInputDialog extends Dialog {
    constructor(scene, config, creators) {
        if (config === undefined) {
            config = {};
        }

        if (creators === undefined) {
            creators = {};
        }

        config.orientation = 'y';

        var spaceConfig = config.space;
        if (spaceConfig) {
            if (spaceConfig.hasOwnProperty('names')) {
                spaceConfig.content = spaceConfig.names;
            }
            if (spaceConfig.hasOwnProperty('namesLeft')) {
                spaceConfig.contentLeft = spaceConfig.namesLeft;
            }
            if (spaceConfig.hasOwnProperty('namesRight')) {
                spaceConfig.contentRight = spaceConfig.namesRight;
            }
        }


        // Background
        var createBackground = GetValue(creators, 'background', CreateBackground);
        config.background = createBackground(scene, config.background);

        // Title
        config.title = CreateLabel(scene, config.title, creators.title);

        // Content
        config.content = CreateContent(scene, config, creators);

        // Actions
        config.actions = [
            CreateLabel(scene, config.button, creators.button)
        ]

        super(scene, config);
        this.type = 'rexNameInputDialog';

        var namesSizerChildrenMap = config.content.childrenMap;
        this.addChildrenMap('firstNameTitle', namesSizerChildrenMap.firstNameTitle);
        this.addChildrenMap('firstNameInput', namesSizerChildrenMap.firstNameInput);
        this.addChildrenMap('lastNameTitle', namesSizerChildrenMap.lastNameTitle);
        this.addChildrenMap('lastNameInput', namesSizerChildrenMap.lastNameInput);

        this.addChildrenMap('button', config.actions[0]);

        // Interactive
        RegisterEvents.call(this);

        this.modalStyle = config.modal || {};
    }

    get firstName() {
        return this.childrenMap.firstNameInput.text;
    }

    set firstName(value) {
        this.childrenMap.firstNameInput.setText(value);
    }

    setFirstName(value) {
        this.firstName = value;
        return this;
    }

    get lastName() {
        return this.childrenMap.lastNameInput.text;
    }

    set lastName(value) {
        this.childrenMap.lastNameInput.setText(value);
    }

    setLastName(value) {
        this.lastName = value;
        return this;
    }

}


Object.assign(
    NameInputDialog.prototype,
    Methods
)

export default NameInputDialog;