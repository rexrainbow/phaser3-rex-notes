import RemoveFromParent from '../../utils/RemoveFromParent.js';
import LayoutMode0 from './LayoutMode0.js';
import LayoutMode1 from './LayoutMode1.js';
import LayoutMode2 from './LayoutMode2.js';
import LayoutMode3 from './LayoutMode3.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const LayoutCallbacks = [LayoutMode0, LayoutMode1, LayoutMode2, LayoutMode3];

var Build = function (config) {
    if (config === undefined) {
        config = {};
    }

    var background = config.background;
    var header = config.header;
    var leftSide = config.leftSide;
    var content = config.content;
    var rightSide = config.rightSide;
    var footer = config.footer;

    // Remove from parent
    RemoveFromParent(background);
    RemoveFromParent(header);
    RemoveFromParent(leftSide);
    RemoveFromParent(content);
    RemoveFromParent(rightSide);
    RemoveFromParent(footer);

    this.clear(true);

    // Add Background
    if (background) {
        this.addBackground(background);
    }

    var layoutMode = GetValue(config, 'layoutMode', 0);
    if (typeof (layoutMode) === 'string') {
        layoutMode = LayoutModesMap[layoutMode.toUpperCase()];
    }
    var layoutCallback = LayoutCallbacks[layoutMode] || LayoutCallbacks[0];
    layoutCallback.call(this, config);

    this.addChildrenMap('background', background);
    this.addChildrenMap('header', header);
    this.addChildrenMap('leftSide', leftSide);
    this.addChildrenMap('content', content);
    this.addChildrenMap('rightSide', rightSide);
    this.addChildrenMap('footer', footer);

    return this;
}

const LayoutModesMap = {
    'FFF': 0,
    'LFF': 1,
    'FFR': 2,
    'LFR': 3
}

export default Build;