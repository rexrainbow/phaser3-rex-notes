import Sizer from '../../../../sizer/Sizer';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Title extends Sizer {
    add: any;
    addChildrenMap: any;
    childrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, {
            orientation: 0,
        });
        this.type = 'rexTweaker.ListDetail.EditorContainer.Title';

        var indexLabel = GetValue(config, 'editorIndexLabel');
        var displayNameLabel = GetValue(config, 'editorDisplayNameLabel');

        if (indexLabel?: any) {
            this.add(
                indexLabel,
                { proportion: 0, expand: true }
            );
        }

        if (displayNameLabel?: any) {
            this.add(
                displayNameLabel,
                { proportion: 1, expand: true }
            );
        }

        this.addChildrenMap('index', indexLabel);
        this.addChildrenMap('displayName', displayNameLabel);
    }

    setTitle(indexConfig?: any, displayNameConfig?: any) {
        SetLabel(this.childrenMap.index, indexConfig);
        SetLabel(this.childrenMap.displayName, displayNameConfig);

        return this;
    }
}

var SetLabel = function(label?: any, config?: any) {
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