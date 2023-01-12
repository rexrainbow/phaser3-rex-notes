import Sizer from '../sizer/Sizer.js';
import LayoutMode0 from './methods/LayoutMode0.js';
import LayoutMode1 from './methods/LayoutMode1.js';
import LayoutMode2 from './methods/LayoutMode2.js';
import LayoutMode3 from './methods/LayoutMode3.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const LayoutCallbacks = [LayoutMode0, LayoutMode1, LayoutMode2, LayoutMode3];

class HolyGrail extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1; // top-to-bottom
        // Create sizer
        super(scene, config);
        this.type = 'rexHolyGrail';

        // Add Background
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        var layoutMode = GetValue(config, 'layoutMode', 0);
        if (typeof (layoutMode) === 'string') {
            layoutMode = LayoutModesMap[layoutMode.toUpperCase()];
        }
        var layoutCallback = LayoutCallbacks[layoutMode] || LayoutCallbacks[0];
        layoutCallback.call(this, config);

        this.addChildrenMap('background', config.background);
        this.addChildrenMap('header', config.header);
        this.addChildrenMap('leftSide', config.leftSide);
        this.addChildrenMap('content', config.content);
        this.addChildrenMap('rightSide', config.rightSide);
        this.addChildrenMap('footer', config.footer);
    }
}

const LayoutModesMap = {
    'FFF': 0,
    'LFF': 1,
    'FFR': 2,
    'LFR': 3
}

export default HolyGrail;