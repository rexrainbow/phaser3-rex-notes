class Base {
    constructor() {
        this.fillColor = undefined;
        this.fillAlpha = 1;

        this.lineWidth = 1;
        this.strokeColor = undefined;
        this.strokeAlpha = 1;
    }

    reset() {
        this.fillStyle();
        this.lineStyle();
        return this;
    }

    fillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.fillColor = color;
        this.fillAlpha = alpha;
        return this;
    }

    lineStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;
        return this;
    }

    canvasRender(context, dx, dy) {

    }

    webglRender(renderer, calcMatrix, dx, dy, alpha) {

    }

    updateData() {

    }
}

export default Base;