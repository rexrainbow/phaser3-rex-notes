import Scrollable from '../utils/scrollable/Scrollable.js';
import GetScrollMode from '../utils/GetScrollMode.js';
import ScrollableBlock from './scrollableblock/ScrollableBlock.js';
import SetChildrenInteractive from '../utils/setchildreninteractive/SetChildrenInteractive.js';
import ScrollToChild from './ScrollToChild.js';

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
        panelConfig.clampChildOY = GetValue(config, 'clampChildOY', false);
        panelConfig.clampChildOX = GetValue(config, 'clampChildOX', false);
        var scrollableBlock = new ScrollableBlock(scene, panelConfig);
        scene.add.existing(scrollableBlock); // Important: Add to display list for touch detecting

        var expandPanelWidth,
            expandPanelHeight;
        switch (scrollMode) {
            case 0:
                expandPanelWidth = GetValue(config, 'expand.panel', true);
                expandPanelHeight = true;
                break;

            case 1:
                expandPanelWidth = true;
                expandPanelHeight = GetValue(config, 'expand.panel', true);
                break;

            default: // 2
                expandPanelWidth = true;
                expandPanelHeight = true;
        }

        // Fill config of scrollable
        config.type = 'rexScrollablePanel';
        config.child = {
            gameObject: scrollableBlock,
            expandWidth: expandPanelWidth,
            expandHeight: expandPanelHeight,
            align: GetValue(config, 'align.panel', 'center')
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = GetValue(spaceConfig, 'panel', 0);
        }
        super(scene, config);

        this.addChildrenMap('panel', scrollableBlock.child);
        this.addChildrenMap('panelLayer', scrollableBlock.maskLayer);
        this.addChildrenMap('mask', scrollableBlock.maskGameObject);
        this.addChildrenMap('scrollableBlock', scrollableBlock);
    }

    setChildrenInteractive(config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('eventEmitter')) {
            config.eventEmitter = this;
        }

        if (!config.hasOwnProperty('targets')) {
            config.targets = [this.childrenMap.panel];
        }

        SetChildrenInteractive(this.childrenMap.child, config);
        return this;
    }
}

var methods = {
    scrollToChild: ScrollToChild
}

Object.assign(
    ScrollablePanel.prototype,
    methods,
)

export default ScrollablePanel;