const Zone = Phaser.GameObjects.Zone;
const RotateAround = Phaser.Math.RotateAround;

class Container extends Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        this.type = 'rexContainer';
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
        return this.children.getChildren();
    }

    contains(gameObject) {
        return this.children.contains(gameObject);
    }

    updatePosition() {
        if (this.children === undefined) {
            return;
        }
        var children = this.getChildren(),
            child,
            childState;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            childState = this.getChildState(child);
            // scale
            PChild.x = childState.x * this.scaleX;
            PChild.y = childState.y * this.scaleY;
            // rotate
            RotateAround(PChild, 0, 0, this.rotation);
            // translate
            PChild.x += this.x;
            PChild.y += this.y;

            child.x = PChild.x;
            child.y = PChild.y;
            child.rotation = childState.face + this.rotation;
        }
    }

    updateVisible() {
        var children = this.getChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children.visible = this.visible;
        }
    }

    destroy() {
        this.children.destroy();
        super.destroy();
    }

    getChildState(gameObject) {
        if (!gameObject.hasOwnProperty('extra')) {
            gameObject.extra = {};
        }
        var extra = gameObject.extra;
        if (!extra.hasOwnProperty('rexContainer')) {
            extra.rexContainer = {};
        }
        return extra.rexContainer;
    }

    resetChildState(gameObject) {
        // translate
        PChild.x = gameObject.x - this.x;
        PChild.y = gameObject.y - this.y;
        // rotate
        RotateAround(PChild, 0, 0, -this.rotation);
        // scale
        PChild.x /= this.scaleX;
        PChild.y /= this.scaleY;

        var state = this.getChildState(gameObject);
        state.x = PChild.x;
        state.y = PChild.y;
        state.face = gameObject.rotation - this.rotation;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (this._x === value) {
            return;
        }
        this._x = value;

        this.updatePosition();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (this._y === value) {
            return;
        }
        this._y = value;

        this.updatePosition();
    }

    // override
    get rotation() {
        return super.rotation;
    }

    set rotation(value) {
        super.rotation = value;

        this.updatePosition();
    }

    // override
    get scaleX() {
        return super.scaleX;
    }

    set scaleX(value) {
        super.scaleX = value;

        this.updatePosition();
    }

    // override
    get scaleY() {
        return super.scaleY;
    }

    set scaleY(value) {
        super.scaleY = value;

        this.updatePosition();
    }

    // override
    get visible() {
        return super.visible;
    }

    set visible(value) {
        super.visible = value;

        this.updatePosition();
    }


}

var PChild = {}; // reuse this point object

export default Container;