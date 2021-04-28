class Base {
    constructor(parent) {
        this.parent = parent;
        this.setVisible();
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

    // Override
    draw() {

    }
}

export default Base;