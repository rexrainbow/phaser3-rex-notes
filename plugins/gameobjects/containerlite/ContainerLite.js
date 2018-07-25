const Zone = Phaser.GameObjects.Zone;
const RotateAround = Phaser.Math.RotateAround;

class ContainerLite extends Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        this.type = 'rexContainer';
        this._alpha = 1;
        this.children = scene.add.group();

        this.setOrigin();  // ?
    }

    add(gameObject) {
        this.children.add(gameObject);
        this.resetChildState(gameObject);
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
        return point;
    }

    localToWorld(point) {
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

        child.x = state.x;
        child.y = state.y;
        this.localToWorld(child);

        child.scaleX = state.scaleX * this.scaleX;
        child.scaleY = state.scaleY * this.scaleY;
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
        super.scaleY = value;

        if (this.children) {
            this.getChildren().forEach(this.updateChildPosition, this);
        }
    }

    // override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        super.visible = value;

        if (this.children) {
            this.getChildren().forEach(this.updateChildVisible, this);
        }
    }

    // override
    setAlpha(value) {
        this.alpha = value;
        return this;
    }

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

var PChild = {}; // reuse this point object

export default ContainerLite;