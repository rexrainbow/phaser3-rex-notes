class Base {
    constructor(parent) {
        this.parent = parent;
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

    // Override
    draw() {

    }
}

export default Base;