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
        this.type = 'rexContainerLite';
        this.isRexContainerLite = true;
        this.syncChildrenEnable = true;

        this._flipX = false;
        this._flipY = false;
        this._alpha = 1;
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
        this.children.destroy(true);
        this.children = undefined;
        super.destroy(fromScene);
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

    getAllChildren(out) {
        if (out === undefined) {
            out = [];
        }
        var myCildren = this.children.getChildren(),
            myChild;
        for (var i = 0, cnt = myCildren.length; i < cnt; i++) {
            myChild = myCildren[i];
            out.push(myChild);

            if (myChild.hasOwnProperty('isRexContainerLite')) {
                out.push(...myChild.getAllChildren());
            }
        }

        return out;
    }

    contains(gameObject) {
        if (this.children.contains(gameObject)) {
            return true;
        }

        var myCildren = this.children.getChildren(),
            myChild;
        for (var i = 0, cnt = myCildren.length; i < cnt; i++) {
            myChild = myCildren[i];

            if (myChild.isRexContainerLite) {
                if (myChild.contains(gameObject)) {
                    return true;
                }
            }
        }

        return false;
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
        if (child.isRexContainerLite) {
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

        if (child.isRexContainerLite) {
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
        // Don't propagate null mask to clear children's mask
        if (this.mask == null) {
            return this;
        }

        var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
        if (maskGameObject !== child) {
            child.mask = this.mask;
        }
        return this;
    }

    updateChildScrollFactor(child) {
        child.setScrollFactor(this.scrollFactorX, this.scrollFactorY);
        return this;
    }

    syncPosition() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildPosition, this);
        }
        return this;
    }

    syncVisible() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildVisible, this);
        }
        return this;
    }

    syncAlpha() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildAlpha, this);
        }
        return this;
    }

    syncMask() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildMask, this);
        }
        return this;
    }

    syncScrollFactor() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildScrollFactor, this);
        }
        return this;
    }

    syncProperties() {
        this.syncPosition().syncVisible().syncAlpha().syncMask();
        return this;
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

        state.scaleX = scale(gameObject.scaleX, this.scaleX);
        state.scaleY = scale(gameObject.scaleY, this.scaleY);

        if (gameObject.flipX !== undefined) {
            state.flipX = gameObject.flipX;
            state.flipY = gameObject.flipY;
        }

        state.rotation = gameObject.rotation - this.rotation;
        state.alpha = scale(gameObject.alpha, this.alpha);
        state.visible = gameObject.visible;
        return this;
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

        this.resetChildState(gameObject)
            .updateChildVisible(gameObject)
            .updateChildScrollFactor(gameObject)
            .updateChildMask(gameObject);

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
        return this._flipX;
    }

    set flipX(value) {
        if (this._flipX === value) {
            return;
        }
        this._flipX = value;

        this.syncPosition();
    }

    // Override
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

    // Override
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

    // Override
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

    resize(width, height) {
        this.setSize(width, height);
        this.updateDisplayOrigin(); // Remove this line until it has merged in `zone.setSize()` function
        return this;
    }
}

Object.assign(
    ContainerLite.prototype,
    Components.Alpha,
    Components.Flip
);

var scale = function (a, b) {
    if (a === b) {
        return 1;
    } else {
        return a / b;
    }
}

export default ContainerLite;