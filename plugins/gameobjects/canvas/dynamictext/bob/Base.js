class Base {
    constructor(parent, type) {
        this.setParent(parent);
        this.type = type;

        this
            .setActive()
            .setVisible();

        this.width = 0;
        this.height = 0;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get canvas() {
        return this.parent.canvas;
    }

    get context() {
        return this.parent.context;
    }

    setDirty(dirty) {
        if (dirty) {
            this.parent.dirty = true;
        }
        return this;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this.setDirty(this._active != value);
        this._active = value;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.setDirty(this._x != value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.setDirty(this._y != value);
        this._y = value;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }

        this.x = x;
        this.y = y;
        return this;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
    }

    setRotation(rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }

        this.rotation = rotation;
        return this;
    }

    // Override
    onFree() {
        this.setParent();
    }

    // Override
    draw() {

    }
}

export default Base;