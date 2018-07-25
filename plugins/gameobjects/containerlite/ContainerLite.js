const Zone = Phaser.GameObjects.Zone;
const RotateAround = Phaser.Math.RotateAround;

class ContainerLite extends Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        this.type = 'rexContainer';
        this._alpha = 1;
        this.children = scene.add.group();
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
        if (this.children === undefined) {
            // only rise when super()
            return [];
        }
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

    updatePosition(child) {
        var state = this.getChildState(child);

        child.x = state.x;
        child.y = state.y;
        this.localToWorld(child);

        child.scaleX = state.scaleX * this.scaleX;
        child.scaleY = state.scaleY * this.scaleY;
        child.rotation = state.face + this.rotation;
    }

    updateVisible(child) {
        child.visible = this.visible;
    }

    updateAlpha(child) {
        var state = this.getChildState(child);
        child.alpha = state.alpha * this.alpha;
    }

    destroy() {
        this.children.destroy();
        super.destroy();
    }

    getChildState(gameObject) {
        if (!gameObject.hasOwnProperty('rexContainer')) {
            gameObject.rexContainer = {};
        }
        return gameObject.rexContainer;
    }

    resetChildState(gameObject) {
        var state = this.getChildState(gameObject);
        state.x = gameObject.x;
        state.y = gameObject.y;
        this.worldToLocal(state);

        state.scaleX = gameObject.scaleX / this.scaleX;
        state.scaleY = gameObject.scaleY / this.scaleY;
        state.face = gameObject.rotation - this.rotation;
        state.alpha = gameObject.alpha / this.alpha;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x === value) {
            return;
        }
        this._x = value;

        this.getChildren().forEach(this.updatePosition, this);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;

        this.getChildren().forEach(this.updatePosition, this);
    }

    // override
    get rotation() {
        return super.rotation;
    }

    set rotation(value) {
        super.rotation = value;

        this.getChildren().forEach(this.updatePosition, this);
    }

    // override
    get scaleX() {
        return super.scaleX;
    }

    set scaleX(value) {
        super.scaleX = value;

        this.getChildren().forEach(this.updatePosition, this);
    }

    // override
    get scaleY() {
        return super.scaleY;
    }

    set scaleY(value) {
        super.scaleY = value;

        this.getChildren().forEach(this.updatePosition, this);
    }

    // override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        super.visible = value;

        this.getChildren().forEach(this.updateVisible, this);
    }

    // override
    setAlpha(value) {
        this.alpha = value;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        if (this._alpha === value) {
            return;
        }

        this._alpha = value;

        this.getChildren().forEach(this.updateAlpha, this);
    }

}

var PChild = {}; // reuse this point object

export default ContainerLite;