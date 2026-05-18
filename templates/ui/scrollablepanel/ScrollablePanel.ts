import Scrollable from '../utils/scrollable/Scrollable';
import GetScrollMode from '../utils/GetScrollMode';
import ScrollableBlock from './scrollableblock/ScrollableBlock';
import SetChildrenInteractive from '../utils/setchildreninteractive/SetChildrenInteractive';
import ScrollToChild from './methods/ScrollToChild';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ScrollablePanel extends Scrollable {
    addChildrenMap: any;
    childrenMap: any;

    constructor(scene?: any, config?: any) {
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
        switch (scrollMode?: any) {
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
        if (spaceConfig?: any) {
            spaceConfig.child = GetValue(spaceConfig, 'panel', 0);
        }
        super(scene, config);

        this.addChildrenMap('panel', scrollableBlock.child);
        this.addChildrenMap('panelLayer', scrollableBlock.maskLayer);
        this.addChildrenMap('mask', scrollableBlock.childrenMaskGameObject);
        this.addChildrenMap('scrollableBlock', scrollableBlock);
    }

    setChildrenInteractive(config?: any) {
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