import Sizer from '../../../../sizer/Sizer';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Toolbar extends Sizer {
    add: any;
    addSpace: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, {
            orientation: 0,
        });
        this.type = 'rexTweaker.ListDetail.EditorContainer.Toolbar';

        var deleteButton = GetValue(config, 'editorDeleteButton');
        var duplicateButton = GetValue(config, 'editorDuplicateButton');
        var resetButton = GetValue(config, 'editorResetButton');
        var previousButton = GetValue(config, 'editorPreviousButton');
        var nextButton = GetValue(config, 'editorNextButton');

        // Align to right side
        if (deleteButton?: any) {
            this.add(
                deleteButton,
                { proportion: 0, expand: true }
            );
        }

        this.addSpace();

        if (duplicateButton?: any) {
            this.add(
                duplicateButton,
                { proportion: 0, expand: true }
            );
        }

        if (resetButton?: any) {
            this.add(
                resetButton,
                { proportion: 0, expand: true }
            );
        }

        if (previousButton?: any) {
            this.add(
                previousButton,
                { proportion: 0, expand: true }
            );
        }

        if (nextButton?: any) {
            this.add(
                nextButton,
                { proportion: 0, expand: true }
            );
        }

    }
}

export default Toolbar;