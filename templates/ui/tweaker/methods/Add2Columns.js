import CreateSplitPanels from '../builders/CreateSplitPanels.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSplit = function (config) {
    if (config === undefined) {
        config = {};
    }

    var splitPanelStyle = GetValue(this.styles, '2columns');
    if (!splitPanelStyle) {
        splitPanelStyle = GetValue(this.styles, 'two-columns') || {};
    }
    splitPanelStyle.tweaker = this.styles;
    splitPanelStyle.root = this.root;
    var splitPanels = CreateSplitPanels(this, config, splitPanelStyle);
    delete splitPanelStyle.tweaker;
    delete splitPanelStyle.root;

    this.add(
        splitPanels,
        { expand: true }
    );

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
