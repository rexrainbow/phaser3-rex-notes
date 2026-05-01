import CreateSplitPanels from '../builders/CreateSplitPanels.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var AddSplit = function (config) {
    if (config === undefined) {
        config = {};
    }

    var splitPanelStyle = GetValue(this.styles, '2columns') || {};
    var splitPanels = CreateSplitPanels(this, config, splitPanelStyle);

    this.add(
        splitPanels,
        {
            proportion: (splitPanels.minWidth === 0) ? 1 : 0,
            expand: true
        }
    );

    splitPanels.setTitle(config);

    var leftPanel = splitPanels.childrenMap.leftPanel;
    var rightPanel = splitPanels.childrenMap.rightPanel;

    var leftConfig = GetValue(config, 'left', undefined);
    if (leftConfig && leftConfig.key) {
        this.root.addChildrenMap(leftConfig.key, leftPanel);
    }

    var rightConfig = GetValue(config, 'right', undefined);
    if (rightConfig && rightConfig.key) {
        this.root.addChildrenMap(rightConfig.key, rightPanel);
    }

    return {
        left: leftPanel,
        right: rightPanel
    };
}

export default AddSplit;
