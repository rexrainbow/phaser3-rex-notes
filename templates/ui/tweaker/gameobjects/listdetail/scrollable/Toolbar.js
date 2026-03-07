import Sizer from '../../../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Toolbar extends Sizer {
    constructor(scene, config) {
        super(scene, {
            orientation: 0,
        });
        this.type = 'rexTweaker.ListDetail.EditorContainer.Toolbar';

        var deleteButton = GetValue(config, 'editorDeleteButton');
        var duplicateButton = GetValue(config, 'editorDuplicateButton');
        var resetButton = GetValue(config, 'editorResetButton');

        // Align to right side
        if (deleteButton) {
            this.add(
                deleteButton,
                { proportion: 0, expand: true }
            );
        }

        this.addSpace();

        if (duplicateButton) {
            this.add(
                duplicateButton,
                { proportion: 0, expand: true }
            );
        }

        if (resetButton) {
            this.add(
                resetButton,
                { proportion: 0, expand: true }
            );
        }

    }

}

export default Toolbar;