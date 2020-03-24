import Methods from './Methods.js';

// Base class
const Zone = Phaser.GameObjects.Zone;
const Group = Phaser.GameObjects.Group;
class Base extends Zone { }
const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Base,
    [
        Components.Alpha,
        Components.Flip
    ]
);
// Base class

class ContainerLite extends Base {
    constructor(scene, x, y, width, height, children) {
        if (Array.isArray(width)) {
            children = width;
            width = undefined;
        }
        if (width === undefined) {
            width = 1;
        }
        if (height === undefined) {
            height = 1;
        }
        super(scene, x, y, width, height);
        this.children = new Group(scene); // Don't add Group into update list, I will destroy it manually
        this.type = 'rexContainerLite';
        this.isRexContainerLite = true;
        this.syncChildrenEnable = true;

        this._active = true;
        this._mask = null;
        this._scrollFactorX = 1;
        this._scrollFactorY = 1;

        if (children) {
            this.add(children);
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.clear();
        this.children.destroy(!fromScene);
        this.children = undefined;
        super.destroy(fromScene);
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x === value) {
            return;
        }
        this._x = value;

        this.syncPosition();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;

        this.syncPosition();
    }

    // Override
    get rotation() {
        return super.rotation;
    }

    set rotation(value) {
        if (this.rotation === value) {
            return;
        }
        super.rotation = value;

        this.syncPosition();
    }

    // Override
    get scaleX() {
        return super.scaleX;
    }

    set scaleX(value) {
        if (this.scaleX === value) {
            return;
        }
        super.scaleX = value;

        this.syncPosition();
    }

    // Override
    get scaleY() {
        return super.scaleY;
    }

    set scaleY(value) {
        if (this.scaleY === value) {
            return;
        }
        super.scaleY = value;

        this.syncPosition();
    }

    // Override
    get flipX() {
        return super.flipX;
    }

    set flipX(value) {
        if (super.flipX === value) {
            return;
        }
        super.flipX = value;

        this.syncPosition();
    }

    // Override
    get flipY() {
        return super.flipY;
    }

    set flipY(value) {
        if (super.flipY === value) {
            return;
        }
        super.flipY = value;

        this.syncPosition();
    }

    // Override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        if (super.visible === value) {
            return;
        }
        super.visible = value;

        this.syncVisible();
    }

    // Override
    get alpha() {
        return super.alpha;
    }

    set alpha(value) {
        if (super.alpha === value) {
            return;
        }
        super.alpha = value;

        this.syncAlpha();
    }

    // Override
    get active() {
        return this._active;
    }

    set active(value) {
        if (this._active === value) {
            return;
        }
        this._active = value;

        this.syncActive();
    }

    // Override
    get mask() {
        return this._mask;
    }
    set mask(mask) {
        if (this._mask === mask) {
            return;
        }
        this._mask = mask;

        this.syncMask();
    }

    // Override
    get scrollFactorX() {
        return this._scrollFactorX;
    }

    set scrollFactorX(value) {
        if (this._scrollFactorX === value) {
            return;
        }

        this._scrollFactorX = value;
        this.syncScrollFactor();
    }
    get scrollFactorY() {
        return this._scrollFactorY;
    }

    set scrollFactorY(value) {
        if (this._scrollFactorY === value) {
            return;
        }

        this._scrollFactorY = value;
        this.syncScrollFactor();
    }

    // Compatiable with container plugin
    get list() {
        return this.children.getChildren();
    }
}

Object.assign(
    ContainerLite.prototype,
    Methods
);

export default ContainerLite;