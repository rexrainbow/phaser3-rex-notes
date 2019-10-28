import Container from '../container/Container.js';
import Methods from './Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Base extends Container {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, 2, 2);

        this.isRexSizer = true;
        this.setMinSize(minWidth, minHeight);
        this.setName(GetValue(config, 'name', ''));
        this.rexSizer = {};
        this.backgroundChildren = undefined;

        var anchorConfig = GetValue(config, 'anchor', undefined);
        if (anchorConfig) {
            this.setAnchor(anchorConfig);
        }

        this.setDraggable(GetValue(config, 'draggable', false));
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
        return this.x - (this.displayWidth * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    alignLeft(value) {
        this.left = value;
        return this;
    }

    get right() {
        return this.left + this.displayWidth;
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value) {
        this.right = value;
        return this;
    }

    get centerX() {
        return this.left + (this.displayWidth / 2);
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    alignCenterX(value) {
        this.centerX = value;
        return this;
    }

    get top() {
        return this.y - (this.displayHeight * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value) {
        this.top = value;
        return this;
    }

    get bottom() {
        return this.top + this.displayHeight;
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value) {
        this.bottom = value;
        return this;
    }

    get centerY() {
        return this.top + (this.displayHeight / 2);
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    alignCenterY(value) {
        this.centerY = value;
        return this;
    }

    pin(gameObject) {
        super.add(gameObject);
        return this;
    }

    addBackground(gameObject) {
        if (this.backgroundChildren === undefined) {
            this.backgroundChildren = [];
        }

        super.add(gameObject);

        var config = this.getSizerConfig(gameObject);
        config.parent = this;
        this.backgroundChildren.push(gameObject);
        return this;
    }
}

Object.assign(
    Base.prototype,
    Methods
);

export default Base;