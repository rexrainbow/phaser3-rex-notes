const Zone = Phaser.GameObjects.Zone;
const Components = Phaser.GameObjects.Components;
const RotateAround = Phaser.Math.RotateAround;

class ContainerLite extends Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        this.setOrigin(0.5, 0.5); // Iit should be set in Zone object
        this.type = 'rexContainer';
        this._flipX = false;
        this._flipY = false;
        this._alpha = 1;
        this.children = scene.add.group();
    }

    add(gameObject) {
        this.children.add(gameObject);
        this.resetChildState(gameObject);
        return this;
    }

    addMultiple(gameObjects) {
        gameObjects.forEach(this.add, this);
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
        var state = this.getLocalState(child);
        P0.x = state.x;
        P0.y = state.y;
        this.localToWorld(P0);
        child.x = P0.x;
        child.y = P0.y;

        child.scaleX = state.scaleX * this.scaleX;
        child.scaleY = state.scaleY * this.scaleY;

        if (child.flipX !== undefined) {
            child.flipX = (!this.flipX) ? state.flipX : !state.flipX;
            child.flipY = (!this.flipY) ? state.flipY : !state.flipY;
        }

        child.rotation = state.face + this.rotation;
    }

    updateChildVisible(child) {
        child.visible = this.visible;
    }

    updateChildAlpha(child) {
        var state = this.getLocalState(child);
        child.alpha = state.alpha * this.alpha;
    }

    destroy() {
        this.children.destroy();
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

        state.face = gameObject.rotation - this.rotation;
        state.alpha = gameObject.alpha / this.alpha;
    }

    setChildLocalPosition(gameObject, x, y) {
        var state = this.getLocalState(gameObject);
        state.x = x;
        state.y = y;
        this.updateChildPosition(gameObject);
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildVisible, this);
        }
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

        if (this.children) {
            this.getChildren().forEach(this.updateChildAlpha, this);
        }
    }

}

var P0 = {}; // reuse this vector2 object

Object.assign(
    ContainerLite.prototype,
    Components.Alpha,
    Components.Flip
);


export default ContainerLite;