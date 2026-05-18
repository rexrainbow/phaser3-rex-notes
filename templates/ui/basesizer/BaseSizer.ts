import Container from '../container/Container';
import Methods from './Methods';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize';
import Clear from '../../../plugins/utils/object/Clear'

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Base extends Container {
    dirty: any;
    minHeight: any;
    minWidth: any;

    _childrenHeight: any;
    _childrenWidth: any;
    backgroundChildren: any;
    childrenMap: any;
    enableLayer: any;
    getAllChildrenSizers: any;
    getChildrenHeight: any;
    getChildrenWidth: any;
    height: any;
    ignoreDestroy: any;
    isRexSizer: any;
    layoutedChildren: any;
    layoutWarnEnable: any;
    originX: any;
    originY: any;
    rexSizer: any;
    runChildrenWrapFlag: any;
    scaleX: any;
    scaleY: any;
    scene: any;
    setAnchor: any;
    setDraggable: any;
    setInnerPadding: any;
    setName: any;
    setOrigin: any;
    sizerChildren: any;
    sizerEventsEnable: any;
    space: any;
    width: any;
    x: any;
    y: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
        super(scene, x, y, 1, 1);
        this.isRexSizer = true;

        var origin = GetValue(config, 'origin', 0.5);
        var originX = GetValue(config, 'originX', origin);
        var originY = GetValue(config, 'originY', origin);
        this.setOrigin(originX, originY);

        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        this.rexSizer = {};
        this.space = {};
        this.backgroundChildren = undefined;
        this.sizerChildren = undefined; // [] or {}
        this.childrenMap = {};
        this.layoutedChildren = undefined;

        // FixWidthSizer uses these flag
        this.runChildrenWrapFlag = false;

        this.enableLayoutWarn(false);

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig?: any) {
            this.setAnchor(anchorConfig);
        }

        this.setInnerPadding(GetValue(config, 'space', 0));

        var draggable = GetValue(config, 'draggable', false);
        if (draggable?: any) {
            this.setDraggable(draggable);
        }

        this.setSizerEventsEnable(GetValue(config, 'sizerEvents', false));
        this.setDirty(true);

        if (GetValue(config, 'enableLayer', false)) {
            this.enableLayer();
        }
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (fromScene?: any) {
            // In this case, children will be cleared and destroy in scene level
            var sizers = this.getAllChildrenSizers([this]);
            for (var i = 0, cnt = sizers.length; i < cnt; i++) {
                sizers[i].sizerEventsEnable = false;
            }
        }

        super.destroy(fromScene);

        Clear(this.backgroundChildren);
        Clear(this.sizerChildren);
        this.childrenMap = undefined;
        this.space = undefined;
        this.rexSizer = undefined;
        this.layoutedChildren = undefined;
    }

    setMinSize(minWidth?: any, minHeight?: any) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }

    setMinWidth(minWidth?: any) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }

    setMinHeight(minHeight?: any) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }

    setDirty(dirty?: any) {
        if (dirty === undefined) {
            dirty = true;
        }
        this.dirty = dirty;
        return this;
    }

    setSizerEventsEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.sizerEventsEnable = enable;
        return this;
    }

    enableLayoutWarn(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.layoutWarnEnable = enable;
        return this;
    }

    get ignoreLayout() {
        // Skip hidden or !dirty sizer
        return this.rexSizer.hidden || (!this.dirty);
    }

    get childrenWidth() {
        if (this._childrenWidth === undefined) {
            this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
    }

    get childrenHeight() {
        if (this._childrenHeight === undefined) {
            this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
    }

    get left() {
        return this.x - (GetDisplayWidth(this) * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    alignLeft(value?: any) {
        this.left = value;
        return this;
    }

    get right() {
        return this.left + GetDisplayWidth(this);
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value?: any) {
        this.right = value;
        return this;
    }

    get centerX() {
        return this.left + (GetDisplayWidth(this) / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    alignCenterX(value?: any) {
        this.centerX = value;
        return this;
    }

    get top() {
        return this.y - (GetDisplayHeight(this) * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value?: any) {
        this.top = value;
        return this;
    }

    get bottom() {
        return this.top + GetDisplayHeight(this);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value?: any) {
        this.bottom = value;
        return this;
    }

    get centerY() {
        return this.top + (GetDisplayHeight(this) / 2);
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    alignCenterY(value?: any) {
        this.centerY = value;
        return this;
    }

    get innerLeft() {
        return this.left + (this.space.left * this.scaleX);
    }

    get innerRight() {
        return this.right - (this.space.right * this.scaleX);
    }

    get innerTop() {
        return this.top + (this.space.top * this.scaleY);
    }

    get innerBottom() {
        return this.bottom - (this.space.bottom * this.scaleY);
    }

    get innerWidth() {
        return (this.width - this.space.left - this.space.right) * this.scaleX;
    }

    get innerHeight() {
        return (this.height - this.space.top - this.space.bottom) * this.scaleY;
    }

    get minInnerWidth() {
        var result = (this.minWidth - this.space.left - this.space.right) * this.scaleX;
        return Math.max(result, 0);
    }

    get minInnerHeight() {
        var result = (this.minHeight - this.space.top - this.space.bottom) * this.scaleY;
        return Math.max(result, 0);
    }
}

Object.assign(
    Base.prototype,
    Methods
);

export default Base;