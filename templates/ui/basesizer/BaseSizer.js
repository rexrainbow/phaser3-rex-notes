import Container from '../container/Container.js';
import Methods from './Methods.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);

        this.isRexSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        this.rexSizer = {};
        this.space = {};
        this.backgroundChildren = undefined;
        this.sizerChildren = undefined; // [] or {}

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig) {
            this.setAnchor(anchorConfig);
        }

        this.setInnerPadding(GetValue(config, 'space', 0));
        this.setDraggable(GetValue(config, 'draggable', false));
        this.setDirty(true);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        if (this.backgroundChildren !== undefined) {
            this.backgroundChildren.length = 0;
        }
        super.destroy(fromScene);
    }

    setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
    }

    setMinWidth(minWidth) {
        if (minWidth == null) {
            minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
    }

    setMinHeight(minHeight) {
        if (minHeight == null) {
            minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
    }

    setDirty(dirty) {
        if (dirty === undefined) {
            dirty = true;
        }
        this.dirty = dirty;
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

    alignLeft(value) {
        this.left = value;
        return this;
    }

    get right() {
        return this.left + GetDisplayWidth(this);
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value) {
        this.right = value;
        return this;
    }

    get centerX() {
        return this.left + (GetDisplayWidth(this) / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    alignCenterX(value) {
        this.centerX = value;
        return this;
    }

    get top() {
        return this.y - (GetDisplayHeight(this) * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value) {
        this.top = value;
        return this;
    }

    get bottom() {
        return this.top + GetDisplayHeight(this);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value) {
        this.bottom = value;
        return this;
    }

    get centerY() {
        return this.top + (GetDisplayHeight(this) / 2);
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    alignCenterY(value) {
        this.centerY = value;
        return this;
    }

    get innerLeft() {
        return this.left + this.space.left;
    }

    get innerRight() {
        return this.right - this.space.right;
    }

    get innerTop() {
        return this.top + this.space.top;
    }

    get innerBottom() {
        return this.bottom - this.space.bottom;
    }

    get innerWidth() {
        return this.width - this.space.left - this.space.right;
    }

    get innerHeight() {
        return this.height - this.space.top - this.space.bottom;
    }
}

Object.assign(
    Base.prototype,
    Methods
);

export default Base;