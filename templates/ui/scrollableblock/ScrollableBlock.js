import BaseSizer from '../basesizer/BaseSizer.js';
import SCROLLMODE from '../utils/ScrollModeConst.js';
import SetChild from './SetChild.js';
import Layout from './Layout.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ScrollableBlock extends BaseSizer {
    constructor(scene, x, y, minWidth, minHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(minWidth)) {
            config = minWidth;
            minWidth = GetValue(config, 'width', undefined);
            minHeight = GetValue(config, 'height', undefined);
        }
        scrollMode = GetValue(config, 'scrollMode', 0);
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexScrollableBlock';
        this.child = undefined;
        this.childMask = undefined;
        this._childOY = 0;
        this.execeedTopState = false;
        this.execeedBottomState = false;

        this.setScrollMode(GetValue(config, 'scrollMode', true))
        this.setClampMode(GetValue(config, 'clamplTextOY', true));

        // Add elements
        // No background object, and child does not have padding
        var child = GetValue(config, 'child', undefined);
        var childMaskEnable = GetValue(config, 'childMask', true);

        this.setChild(child, childMaskEnable);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.child = undefined;
        this.childMask = undefined;
        super.destroy(fromScene);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }


    setClampMode(mode) {
        this.clampTextOYMode = mode;
        return this;
    }
}

var methods = {
    setChild: SetChild,
    layout: Layout,
}
Object.assign(
    ScrollableBlock.prototype,
    methods
);

export default ScrollableBlock;