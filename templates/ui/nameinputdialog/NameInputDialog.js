import Dialog from '../dialog/Dialog.js';
import Methods from './methods/Methods.js';
import CreateContent from './methods/CreateContent.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateLabel from '../utils/build/CreateLabel.js';

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

        // Background
        var createBackground = GetValue(creators, 'background', CreateBackground);
        config.background = createBackground(scene, config.background);

        // Title
        config.title = CreateLabel(scene, config.title, creators.title);

        // Content
        config.content = CreateContent(scene, config, creators);

        // Actions
        config.actions = [
            CreateLabel(scene, config.action, creators.action)
        ]

        super(scene, config);
        this.type = 'rexNameInputDialog';

        var namesSizerChildrenMap = config.content.childrenMap;
        this.addChildrenMap('firstNameTitle', namesSizerChildrenMap.firstNameTitle);
        this.addChildrenMap('firstNameInput', namesSizerChildrenMap.firstNameInput);
        this.addChildrenMap('lastNameTitle', namesSizerChildrenMap.lastNameTitle);
        this.addChildrenMap('lastNameInput', namesSizerChildrenMap.lastNameInput);
    }
}


Object.assign(
    NameInputDialog.prototype,
    Methods
)

export default NameInputDialog;