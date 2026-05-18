import BaseSizer from '../../basesizer/BaseSizer';
import Methods from './Methods';
import SCROLLMODE from '../../utils/ScrollModeConst';
import { GetDisplayWidth, GetDisplayHeight } from '../../../../plugins/utils/size/GetDisplaySize';

import { Display as PhaserDisplay, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;
const ALIGN_LEFTTOP = PhaserDisplay.Align.TOP_LEFT;

class ScrollableBlock extends BaseSizer {
    _childOX: any;
    _childOY: any;
    add: any;
    child: any;
    clampChildOX: any;
    clampChildOY: any;
    destroyChildrenMask: any;
    displayHeight: any;
    displayWidth: any;
    emit: any;
    enableLayer: any;
    execeedBottomState: any;
    execeedLeftState: any;
    execeedRightState: any;
    execeedTopState: any;
    getSizerConfig: any;
    ignoreDestroy: any;
    resetChildPosition: any;
    scene: any;
    scrollMode: any;
    setupChildrenMask: any;
    sizerChildren: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
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
        this._childOY = 0;
        this._childOX = 0;
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;

        this.setScrollMode(GetValue(config, 'scrollMode', 0));

        var clampChildOY = GetValue(config, 'clampChildOY', true);
        var clampChildOX = GetValue(config, 'clampChildOX', clampChildOY);
        this.setClampMode(clampChildOY, clampChildOX);

        // Add elements
        // No background object, and child does not have padding
        var child = GetValue(config, 'child', undefined);
        var expand = GetValue(config, 'expand', true);

        var childOrigin0 = GetValue(config, 'childOrigin0', true);
        if (childOrigin0 && child.setOrigin) {
            child.setOrigin(0);
        }

        this.add(child);
        this.sizerChildren = [child];

        var sizerConfig = this.getSizerConfig(child);
        sizerConfig.align = ALIGN_LEFTTOP;
        sizerConfig.expand = expand;
        this.child = child;

        if (GetValue(config, 'enableLayer', false)) {
            this.enableLayer();
        }

        // Create mask of child object
        this.setupChildrenMask(GetValue(config, 'mask', undefined));
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.destroyChildrenMask();

        this.child = undefined;

        super.destroy(fromScene);
    }

    setScrollMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }

    setClampMode(clampChildOY?: any, clampChildOX?: any) {
        this.clampChildOY = clampChildOY;
        this.clampChildOX = clampChildOX;
        return this;
    }

    get instHeight() {
        if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
            return this.displayHeight;
        } else { // scrollMode === 1
            return this.displayWidth;
        }
    }

    get instWidth() {
        if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
            return this.displayWidth;
        } else { // scrollMode === 1
            return this.displayHeight;
        }
    }

    get childHeight() {
        if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
            return GetDisplayHeight(this.child);
        } else { // scrollMode === 1
            return GetDisplayWidth(this.child);
        }
    }

    get childWidth() {
        if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
            return GetDisplayWidth(this.child);
        } else { // scrollMode === 1
            return GetDisplayHeight(this.child);
        }
    }

    get topChildOY() {
        return 0;
    }

    get bottomChildOY() {
        return -this.visibleHeight;
    }

    get leftChildOX() {
        return 0;
    }

    get rightChildOX() {
        return -this.visibleWidth;
    }

    get childVisibleHeight() {
        return this.instHeight;
    }

    get childVisibleWidth() {
        return this.instWidth;
    }

    get visibleHeight() {
        var h = this.childHeight - this.childVisibleHeight;
        if (h < 0) {
            h = 0;
        }
        return h;
    }

    get visibleWidth() {
        var w = this.childWidth - this.childVisibleWidth;
        if (w < 0) {
            w = 0;
        }
        return w;
    }

    childOYExceedTop(oy?: any) {
        if (oy === undefined) {
            oy = this.childOY;
        }
        return (oy > this.topChildOY);
    }

    childOYExeceedBottom(oy?: any) {
        if (oy === undefined) {
            oy = this.childOY;
        }
        return (oy < this.bottomChildOY);
    }

    childOXExceedLeft(ox?: any) {
        if (ox === undefined) {
            ox = this.childOX;
        }
        return (ox > this.leftChildOX);
    }

    childOXExeceedRight(ox?: any) {
        if (ox === undefined) {
            ox = this.childOX;
        }
        return (ox < this.rightChildOX);
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
            if (this.childVisibleHeight > this.childHeight) {
                oy = 0;
            } else if (childOYExceedTop) {
                oy = topChildOY;
            } else if (childOYExeceedBottom) {
                oy = bottomChildOY;
            }
        }

        if (this._childOY !== oy) {
            this._childOY = oy;
            this.resetChildPosition();
        }

        if (childOYExceedTop?: any) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topChildOY);
            }
        }
        this.execeedTopState = childOYExceedTop;

        if (childOYExeceedBottom?: any) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomChildOY);
            }
        }
        this.execeedBottomState = childOYExeceedBottom;
    }

    get childOX() {
        return this._childOX;
    }

    set childOX(ox) {
        var leftChildOX = this.leftChildOX;
        var rightChildOX = this.rightChildOX;
        var childOXExceedLeft = this.childOXExceedLeft(ox);
        var childOXExeceedRight = this.childOXExeceedRight(ox);

        if (this.clampChildOX) {
            if (this.childVisibleWidth > this.childWidth) {
                ox = 0;
            } else if (childOXExceedLeft) {
                ox = leftChildOX;
            } else if (childOXExeceedRight) {
                ox = rightChildOX;
            }
        }

        if (this._childOX !== ox) {
            this._childOX = ox;
            this.resetChildPosition();
        }

        if (childOXExceedLeft?: any) {
            if (!this.execeedLeftState) {
                this.emit('execeedleft', this, ox, leftChildOX);
            }
        }
        this.execeedLeftState = childOXExceedLeft;

        if (childOXExeceedRight?: any) {
            if (!this.execeedRightState) {
                this.emit('execeedright', this, ox, rightChildOX);
            }
        }
        this.execeedRightState = childOXExeceedRight;
    }

    setChildOY(oy?: any) {
        this.childOY = oy;
        return this;
    }

    setChildOX(ox?: any) {
        this.childOX = ox;
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

    set s(value) {
        this.childOX = -this.visibleWidth * value;
    }

    get s() {
        var visibleWidth = this.visibleWidth;
        if (visibleWidth === 0) {
            return 0;
        }
        return (this.childOX / -visibleWidth);
    }

    setChildOYByPercentage(percentage?: any) {
        this.t = percentage;
        return this;
    }

    setChildOXByPercentage(percentage?: any) {
        this.s = percentage;
        return this;
    }

    setChildTopLeftPosition(x?: any, y?: any) {
        var child = this.child;
        x += GetDisplayWidth(child) * child.originX;
        y += GetDisplayHeight(child) * child.originY;
        child.setPosition(x, y);
        return this;
    }
}

Object.assign(
    ScrollableBlock.prototype,
    Methods
);

export default ScrollableBlock;