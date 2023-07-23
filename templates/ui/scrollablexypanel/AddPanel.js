import ScrollableBlock from "../utils/scrollableblock/ScrollableBlock.js";

const GetValue = Phaser.Utils.Objects.GetValue;

var AddPanel = function (parent, config) {
    var panelConfig = GetValue(config, 'panel', undefined);
    if (panelConfig === undefined) {
        panelConfig = {};
    }
    panelConfig.scrollMode = 2;
    panelConfig.clamplChildOY = GetValue(config, 'clamplChildOY', false);
    panelConfig.clamplChildOX = GetValue(config, 'clamplChildOX', false);
    var scrollableBlock = new ScrollableBlock(parent.scene, panelConfig)

    parent.add(scrollableBlock,
        {
            column: 1,
            row: 1,
            align: 'center',
            expand: GetValue(config, 'expand.panel', true),
        }
    );
    parent.addChildrenMap('panel', scrollableBlock.child);
}

export default AddPanel;