import BaseSizer from '../../basesizer/BaseSizer.js';
import Methods from './Methods.js';
import SCROLLMODE from '../../utils/ScrollModeConst.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

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
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexScrollableBlock';
        this.child = undefined;
        this.childrenMask = undefined;
        this._childOY = 0;
        this.execeedTopState = false;
        this.execeedBottomState = false;

        this.setScrollMode(GetValue(config, 'scrollMode', true))
        this.setClampMode(GetValue(config, 'clamplChildOY', true));

        // Add elements
        // No background object, and child does not have padding
        var child = GetValue(config, 'child', undefined);
        var expand = GetValue(config, 'expand', true);
        var maskConfig = GetValue(config, 'mask', undefined);

        if (child.setOrigin) {
            child.setOrigin(0);
        }

        this.add(child);
        this.sizerChildren = [child];

        var sizerConfig = this.getSizerConfig(child);
        sizerConfig.align = ALIGN_LEFTTOP;
        sizerConfig.expand = expand;
        this.child = child;

        // Create mask of child object
        var maskEnable, maskPadding, maskUpdateMode;
        if (maskConfig === true) {
            maskEnable = true;
            maskPadding = 0;
            maskUpdateMode = 0;
        } else if (maskConfig === false) {
            maskEnable = false;
        } else {
            maskEnable = GetValue(maskConfig, 'mask', true);
            maskPadding = GetValue(maskConfig, 'padding', 0);
            maskUpdateMode = GetValue(config, 'updateMode', 0);
        }

        if (maskEnable) {
            this.setMaskUpdateMode(maskUpdateMode);
            this.enableChildrenMask(maskPadding);
            this.startMaskUpdate();
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        if (this.childrenMask) {
            this.stopMaskUpdate();
        }

        this.child = undefined;
        if (this.childrenMask) {
            this.childrenMask.destroy();
            this.childrenMask = undefined;
        }
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
        if (mode === undefined) {
            mode = true;
        }
        this.clampChildOY = mode;
        return this;
    }

    get instHeight() {
        return (this.scrollMode === 0) ? this.height : this.width;
    }

    get instWidth() {
        return (this.scrollMode === 0) ? this.width : this.height;
    }

    get childHeight() {
        return (this.scrollMode === 0) ? GetDisplayHeight(this.child) : GetDisplayWidth(this.child);
    }

    get childWidth() {
        return (this.scrollMode === 0) ? GetDisplayWidth(this.child) : GetDisplayHeight(this.child);
    }

    get topChildOY() {
        return 0;
    }

    get bottomChildOY() {
        return -this.visibleHeight;
    }

    get visibleHeight() {
        var h;
        var childHeight = this.childHeight;
        var instHeight = this.instHeight;
        if (childHeight > instHeight) {
            h = childHeight - instHeight;
        } else {
            h = 0;
        }

        return h;
    }

    childOYExceedTop(oy) {
        if (oy === undefined) {
            oy = this.childOY;
        }
        return (oy > this.topChildOY);
    }

    childOYExeceedBottom(oy) {
        if (oy === undefined) {
            oy = this.childOY;
        }
        return (oy < this.bottomChildOY);
    }

    get childOY() {
        return this._childOY;
    }

    set childOY(oy) {
        var topChildOY = this.topChildOY;
        var bottomChildOY = this.bottomChildOY;
        var childOYExceedTop = this.childOYExceedTop(oy);
        var childOYExeceedBottom = this.childOYExeceedBottom(oy);

        if (this.clampChildOY) {
            if (this.instHeight > this.childHeight) {
                oy = 0;
            } else if (childOYExceedTop) {
                oy = topChildOY
            } else if (childOYExeceedBottom) {
                oy = bottomChildOY;
            }
        }

        if (this._childOY !== oy) {
            this._childOY = oy;
            this.resetChildPosition();
        }

        if (childOYExceedTop) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topChildOY);
            }
        }
        this.execeedTopState = childOYExceedTop;

        if (childOYExeceedBottom) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomChildOY);
            }
        }
        this.execeedBottomState = childOYExeceedBottom;
    }

    setChildOY(oy) {
        this.childOY = oy;
        return this;
    }

    set t(value) {
        this.childOY = -this.visibleHeight * value;
    }

    get t() {
        var visibleHeight = this.visibleHeight;
        if (visibleHeight === 0) {
            return 0;
        }
        return (this.childOY / -visibleHeight);
    }

    setChildOYByPercentage(percentage) {
        this.t = percentage;
        return this;
    }
}

Object.assign(
    ScrollableBlock.prototype,
    Methods
);

export default ScrollableBlock;