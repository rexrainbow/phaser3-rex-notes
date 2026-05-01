import Sizer from '../../../../sizer/Sizer.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Title extends Sizer {
    constructor(scene, config) {
        super(scene, {
            orientation: 0,
        });
        this.type = 'rexTweaker.ListDetail.EditorContainer.Title';

        var indexLabel = GetValue(config, 'editorIndexLabel');
        var displayNameLabel = GetValue(config, 'editorDisplayNameLabel');

        if (indexLabel) {
            this.add(
                indexLabel,
                { proportion: 0, expand: true }
            );
        }

        if (displayNameLabel) {
            this.add(
                displayNameLabel,
                { proportion: 1, expand: true }
            );
        }

        this.addChildrenMap('index', indexLabel);
        this.addChildrenMap('displayName', displayNameLabel);
    }

    setTitle(indexConfig, displayNameConfig) {
        SetLabel(this.childrenMap.index, indexConfig);
        SetLabel(this.childrenMap.displayName, displayNameConfig);

        return this;
    }
}

var SetLabel = function (label, config) {
    if (!label) {
        return;
    }

    if (config === undefined) {
        config = '';
    }

    if (typeof (config) === 'string') {
        label.setText(config);
    } else {
        label.setTitle(config);
    }
}

export default Title;
