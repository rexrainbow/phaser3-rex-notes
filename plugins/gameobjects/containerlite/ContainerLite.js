const Zone = Phaser.GameObjects.Zone;
const Components = Phaser.GameObjects.Components;
const RotateAround = Phaser.Math.RotateAround;
const ArrayUtils = Phaser.Utils.Array;

class ContainerLite extends Zone {
    constructor(scene, x, y, width, height, children) {
        if (Array.isArray(width)) {
            children = width;
            width = undefined;
        }
        super(scene, x, y, width, height);
        this.children = scene.add.group();
        this.setOrigin(0.5, 0.5); // It should be set in Zone object
        this.type = 'rexContainerLite';
        this.syncChildrenEnable = true;

        this._flipX = false;
        this._flipY = false;
        this._alpha = 1;
        this._mask = null;

        if (children) {
            this.add(children);
        }
    }

    add(gameObject) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject);
        } else {
            this._add(gameObject);
        }
        return this;
    }

    addMultiple(gameObjects) {
        gameObjects.forEach(this._add, this);
        return this;
    }

    remove(gameObject) {
        this.children.remove(gameObject);
        return this;
    }

    clear() {
        this.children.clear();
        return this;
    }

    getChildren() {
        return this.children.getChildren();
    }

    contains(gameObject) {
        return this.children.contains(gameObject);
    }

    worldToLocal(point) {
        // translate
        point.x -= this.x;
        point.y -= this.y;
        // rotate
        RotateAround(point, 0, 0, -this.rotation);
        // scale
        point.x /= this.scaleX;
        point.y /= this.scaleY;
        // flip
        point.x *= ((!this.flipX) ? 1 : -1);
        point.y *= ((!this.flipY) ? 1 : -1);
        return point;
    }

    localToWorld(point) {
        // flip
        point.x *= ((!this.flipX) ? 1 : -1);
        point.y *= ((!this.flipY) ? 1 : -1);
        // scale
        point.x *= this.scaleX;
        point.y *= this.scaleY;
        // rotate
        RotateAround(point, 0, 0, this.rotation);
        // translate
        point.x += this.x;
        point.y += this.y;
        return point;
    }

    updateChildPosition(child) {
        var isContainerLite = (child.hasOwnProperty('syncChildrenEnable'));
        if (isContainerLite) {
            child.syncChildrenEnable = false;
        }
        var state = this.getLocalState(child);
        child.x = state.x;
        child.y = state.y;
        this.localToWorld(child);

        child.scaleX = state.scaleX * this.scaleX;
        child.scaleY = state.scaleY * this.scaleY;

        if (child.flipX !== undefined) {
            child.flipX = (!this.flipX) ? state.flipX : !state.flipX;
            child.flipY = (!this.flipY) ? state.flipY : !state.flipY;
        }

        child.rotation = state.rotation + this.rotation;

        if (isContainerLite) {
            child.syncChildrenEnable = true;
            child.syncPosition();
        }
        return this;
    }

    updateChildVisible(child) {
        child.visible = this.visible && this.getLocalState(child).visible;
        return this;
    }

    updateChildAlpha(child) {
        child.alpha = this.alpha * this.getLocalState(child).alpha;
        return this;
    }

    updateChildMask(child) {
        if (this._mask !== child) {
            child.mask = this._mask;
        }
        return this;
    }

    syncPosition() {
        if (this.children && this.syncChildrenEnable) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
        return this;
    }

    syncVisible() {
        if (this.children && this.syncChildrenEnable) {
            this.getChildren().forEach(this.updateChildVisible, this);
        }
        return this;
    }

    syncAlpha() {
        if (this.children && this.syncChildrenEnable) {
            this.getChildren().forEach(this.updateChildAlpha, this);
        }
        return this;
    }

    syncMask() {
        if (this.children && this.syncChildrenEnable) {
            this.getChildren().forEach(this.updateChildMask, this);
        }
        return this;
    }

    syncProperties() {
        this.syncPosition().syncVisible().syncAlpha().syncMask();
        return this;
    }

    destroy() {
        this.children.destroy(true);
        this.children = undefined;
        super.destroy();
    }

    getLocalState(gameObject) {
        if (!gameObject.hasOwnProperty('rexContainer')) {
            gameObject.rexContainer = {};
        }
        return gameObject.rexContainer;
    }

    resetChildState(gameObject) {
        var state = this.getLocalState(gameObject);
        state.x = gameObject.x;
        state.y = gameObject.y;
        this.worldToLocal(state);

        state.scaleX = gameObject.scaleX / this.scaleX;
        state.scaleY = gameObject.scaleY / this.scaleY;

        if (gameObject.flipX !== undefined) {
            state.flipX = gameObject.flipX;
            state.flipY = gameObject.flipY;
        }

        state.rotation = gameObject.rotation - this.rotation;
        state.alpha = gameObject.alpha / this.alpha;

        state.visible = gameObject.visible;
    }

    setChildLocalPosition(gameObject, x, y) {
        var state = this.getLocalState(gameObject);
        state.x = x;
        state.y = y;
        this.updateChildPosition(gameObject);
        return this;
    }

    _add(gameObject) {
        this.children.add(gameObject);
        this.resetChildState(gameObject);

        if (!this._visible) {
            gameObject.visible = false;
        }

        if (this._mask && (this._mask !== gameObject)) {
            gameObject.mask = this._mask;
        }
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

    // override
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

    // override
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

    // override
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

    // override
    get flipX() {
        return this._flipX;
    }

    set flipX(value) {
        if (this._flipX === value) {
            return;
        }
        this._flipX = value;

        this.syncPosition();
    }

    // override
    get flipY() {
        return this._flipY;
    }

    set flipY(value) {
        if (this._flipY === value) {
            return;
        }
        this._flipY = value;

        this.syncPosition();
    }

    // override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        if (this.visible === value) {
            return;
        }
        super.visible = value;

        this.syncVisible();
    }

    // override
    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (this._alpha === value) {
            return;
        }
        this._alpha = value;

        this.syncAlpha();
    }

    // override
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

    setMask(mask) {
        this.mask = mask;
        return this;
    }

    clearMask(destroyMask) {
        if (destroyMask === undefined) {
            destroyMask = false;
        }

        if (destroyMask && this.mask) {
            this.mask.destroy();
        }
        this.mask = null;
        return this;
    }

    // compatiable with container plugin
    get list() {
        return this.getChildren();
    }

    getByName(name) {
        return ArrayUtils.GetFirst(this.list, 'name', name);
    }

    getRandom(startIndex, length) {
        return ArrayUtils.GetRandom(this.list, startIndex, length);
    }

    getFirst(property, value, startIndex, endIndex) {
        return ArrayUtils.GetFirstElement(this.list, property, value, startIndex, endIndex);
    }

    getAll(property, value, startIndex, endIndex) {
        return ArrayUtils.GetAll(this.list, property, value, startIndex, endIndex);
    }

    count(property, value, startIndex, endIndex) {
        return ArrayUtils.CountAllMatching(this.list, property, value, startIndex, endIndex);
    }

    swap(child1, child2) {
        ArrayUtils.Swap(this.list, child1, child2);
        return this;
    }

    moveTo(child, index) {
        ArrayUtils.MoveTo(this.list, child, index);
        return this;
    }

    setAll(property, value, startIndex, endIndex) {
        ArrayUtils.SetAll(this.list, property, value, startIndex, endIndex);
        return this;
    }
}

Object.assign(
    ContainerLite.prototype,
    Components.Alpha,
    Components.Flip
);


export default ContainerLite;