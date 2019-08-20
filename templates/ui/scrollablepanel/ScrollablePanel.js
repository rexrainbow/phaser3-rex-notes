import Scrollable from '../utils/scrollable/Scrollable.js';
import GetScrollMode from '../utils/GetScrollMode.js';
import ScrollableBlock from '../scrollableblock/ScrollableBlock.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ScrollablePanel extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create scrollable-block
        var scrollMode = GetScrollMode(config);
        var panelConfig = GetValue(config, 'panel', undefined);
        if (panelConfig === undefined) {
            panelConfig = {};
        }
        panelConfig.scrollMode = scrollMode;
        panelConfig.clamplChildOY = GetValue(config, 'clamplChildOY', false);
        var scrollableBlock = new ScrollableBlock(scene, panelConfig);
        var panelWidth = GetValue(panelConfig, 'width', undefined);
        var panelHeight = GetValue(panelConfig, 'height', undefined);
        var proportion, expand;
        if (scrollMode === 0) {
            proportion = (panelWidth === undefined) ? 1 : 0;
            expand = (panelHeight === undefined);
        } else {
            proportion = (panelHeight === undefined) ? 1 : 0;
            expand = (panelWidth === undefined);
        }

        // Fill config of scrollable
        config.type = 'rexScrollablePanel';
        config.child = {
            gameObject: scrollableBlock,
            proportion: proportion,
            expand: expand,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = spaceConfig.panel;
        }
        super(scene, config);

        this.addChildrenMap('panel', this.childrenMap.child.child);
    }
}

export default ScrollablePanel;