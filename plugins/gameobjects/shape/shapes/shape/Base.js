class Base {
    constructor() {
        this.name = undefined;

        this.isFilled = false;
        this.fillColor = undefined;
        this.fillAlpha = 1;

        this.isStroked = false;
        this.lineWidth = 1;
        this.strokeColor = undefined;
        this.strokeAlpha = 1;

        this.dirty = true;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    reset() {
        this.fillStyle();
        this.lineStyle();
        return this;
    }

    fillStyle(color, alpha) {
        if (color === undefined) {
            this.isFilled = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isFilled = true;
            this.fillColor = color;
            this.fillAlpha = alpha;
        }
        return this;
    }

    lineStyle(lineWidth, color, alpha) {
        if (lineWidth === undefined) {
            this.isStroked = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isStroked = true;
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
        }
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {

    }

    canvasRender(ctx, dx, dy) {

    }

    updateData() {

    }
}

export default Base;