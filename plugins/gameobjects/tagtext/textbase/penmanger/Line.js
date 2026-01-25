class Line {
    constructor(pens) {
        this.pens = pens || [];
        this.maxAscent = 0;
        this.maxDescent = 0;
        this.lineHeight = 0;
    }

    reset() {
        this.pens.length = 0;
        this.maxAscent = 0;
        this.maxDescent = 0;
        this.lineHeight = 0;
        return this;
    }

    addPen(pen) {
        this.pens.push(pen);
        if (pen.ascent > this.maxAscent) {
            this.maxAscent = pen.ascent;
        }
        if (pen.descent > this.maxDescent) {
            this.maxDescent = pen.descent;
        }
        return this;
    }

    get length() {
        return this.pens.length;
    }

    get lastPen() {
        return this.pens[this.pens.length - 1];
    }
}

export default Line;
