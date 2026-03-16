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
        SetValue(config, 'header', title);
        SetValue(config, 'expand.header', true);

        var toolbar;
        if (HasToolbar(config)) {
            toolbar = new Toolbar(scene, config);
            scene.add.existing(toolbar);

            if (toolbar) {
                SetValue(config, 'footer', toolbar);
                SetValue(config, 'expand.footer', true);
            }
        }

        super(scene, config);
        this.type = 'rexTweaker.ListDetail.EditorContainer';

        this.addChildrenMap('title', title);
        this.addChildrenMap('inputTweaker', config.editor);
        this.addChildrenMap('toolbar', toolbar);

        var deleteButton = config.editorDeleteButton;
        var duplicateButton = config.editorDuplicateButton;
        var resetButton = config.editorResetButton;
        var previousButton = config.editorPreviousButton;
        var nextButton = config.editorNextButton;
        this.addChildrenMap('deleteButton', deleteButton);
        this.addChildrenMap('duplicateButton', duplicateButton);
        this.addChildrenMap('resetButton', resetButton);
        this.addChildrenMap('previousButton', previousButton);
        this.addChildrenMap('nextButton', nextButton);

        if (deleteButton) {
            deleteButton
                .offClick(this.onClickDeleteButton, this)
                .onClick(this.onClickDeleteButton, this);
        }

        if (duplicateButton) {
            duplicateButton
                .offClick(this.onClickDuplicateButton, this)
                .onClick(this.onClickDuplicateButton, this);
        }

        if (resetButton) {
            resetButton
                .offClick(this.onClickResetButton, this)
                .onClick(this.onClickResetButton, this);
        }

        if (previousButton) {
            previousButton
                .offClick(this.onClickPreviousButton, this)
                .onClick(this.onClickPreviousButton, this);
        }

        if (nextButton) {
            nextButton
                .offClick(this.onClickNextButton, this)
                .onClick(this.onClickNextButton, this);
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

    onClickPreviousButton() {
        this.emit('toolbar.previous');
    }

    onClickNextButton() {
        this.emit('toolbar.next');
    }

    setTitle(indexConfig, displayNameConfig) {
        var title = this.childrenMap.header;
        title.setTitle(indexConfig, displayNameConfig);
        return this;
    }

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }

        this.readOnly = value;
        this.childrenMap.inputTweaker.setReadOnly(value);
        return this;
    }
}

var HasToolbar = function (config) {
    return !!config.editorDeleteButton || !!config.editorDuplicateButton || !!config.editorResetButton || !!config.editorPreviousButton || !!config.editorNextButton;
}

export default EditorContainer;
