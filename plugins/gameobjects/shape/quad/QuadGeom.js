class QuadGeom {
    constructor(x, y, width, height) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }

        this.setTo(x, y, width, height);

        this.tlx = 0;
        this.tly = 0;
        this.trx = 0;
        this.try = 0;
        this.blx = 0;
        this.bly = 0;
        this.brx = 0;
        this.bry = 0;
    }

    setTo(x, y, width, height) {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    setTLPosition(x, y) {
        this.tlx = x;
        this.tly = y;
        return this;
    }

    setTRPosition(x, y) {
        this.trx = x;
        this.try = y;
        return this;
    }

    setBLPosition(x, y) {
        this.blx = x;
        this.bly = y;
        return this;
    }

    setBRPosition(x, y) {
        this.brx = x;
        this.bry = y;
        return this;
    }

    resetCornerPosition() {
        this
            .setTLPosition(0, 0)
            .setTRPosition(0, 0)
            .setBLPosition(0, 0)
            .setBRPosition(0, 0);

        return this;
    }
}

export default QuadGeom;