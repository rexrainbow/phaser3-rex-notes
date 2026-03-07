import Scrollable from '../../scrollable/Scrollable.js';
import Title from './Title.js';
import Toolbar from './Toolbar.js';
import SetValue from '../../../../../../plugins/utils/object/SetValue.js';

class EditorContainer extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var title = new Title(scene, config);
        scene.add.existing(title);
        SetValue(config, 'header', toolbar);
        SetValue(config, 'expand.header', true);

        if (HasToolbar(config)) {
            var toolbar = new Toolbar(scene, config);
            scene.add.existing(toolbar);

            if (toolbar) {
                SetValue(config, 'footer', toolbar);
                SetValue(config, 'expand.footer', true);
            }
        }

        super(scene, config);
        this.type = 'rexTweaker.ListDetail.EditorContainer';

        this.addChildrenMap('toolbar', toolbar);

        var deleteButton = config.editorDeleteButton;
        var duplicateButton = config.editorDuplicateButton;
        var resetButton = config.editorResetButton;
        this.addChildrenMap('deleteButton', deleteButton);
        this.addChildrenMap('duplicateButton', duplicateButton);
        this.addChildrenMap('resetButton', resetButton);

        if (deleteButton) {
            deleteButton.onClick(this.onClickDeleteButton, this);
        }

        if (duplicateButton) {
            duplicateButton.onClick(this.onClickDuplicateButton, this);
        }

        if (resetButton) {
            resetButton.onClick(this.onClickResetButton, this);
        }
    }

    onClickDeleteButton() {
        this.emit('toolbar.delete');
    }

    onClickDuplicateButton() {
        this.emit('toolbar.duplicate');
    }

    onClickResetButton() {
        this.emit('toolbar.reset');
    }

    setTitle(indexConfig, displayNameConfig) {
        // Invoke Title's setTitle method
        return this;
    }
}

var HasToolbar = function (config) {
    return !!config.editorDeleteButton || !!config.editorDuplicateButton || !!config.editorResetButton;
}

export default EditorContainer;
