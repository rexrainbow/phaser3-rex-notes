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

    // Override
    draw() {

    }
}

export default Base;