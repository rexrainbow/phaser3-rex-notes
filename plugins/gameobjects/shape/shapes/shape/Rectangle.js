import Base from './Base.js';
import StrokePathWebGL from '../../utils/render/StrokePathWebGL.js';
import FillStyleCanvas from '../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../utils/render/LineStyleCanvas.js';

const Utils = Phaser.Renderer.WebGL.Utils;

class Rectangle extends Base {
    constructor(x, y, width, height) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = width;
        }

        super();

        this.pathData = [];
        this.closePath = true;

        this.setTopLeftPosition(x, y);
        this.setSize(width, height);
    }

    setTopLeftPosition(x, y) {
        this.dirty = this.dirty || (this.x !== x) || (this.y !== y);
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width, height) {
        this.dirty = this.dirty || (this.width !== width) || (this.height !== height);
        this.width = width;
        this.height = height;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        var x0 = this.x,
            x1 = x0 + this.width,
            y0 = this.y,
            y1 = y0 + this.height;
        this.pathData.push(x0, y0);
        this.pathData.push(x1, y0);
        this.pathData.push(x1, y1);
        this.pathData.push(x0, y1);
        this.pathData.push(x0, y0);
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            var fillTint = pipeline.fillTint;
            var fillTintColor = Utils.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * alpha);

            fillTint.TL = fillTintColor;
            fillTint.TR = fillTintColor;
            fillTint.BL = fillTintColor;
            fillTint.BR = fillTintColor;

            pipeline.batchFillRect(-dx + this.x, -dy + this.y, this.width, this.height);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fillRect(-dx, -dy, this.width, this.height);
        }

        if (this.isStroked) {
            LineStyleCanvas(ctx, this);
            ctx.beginPath();
            ctx.rect(-dx, -dy, this.width, this.height);
            ctx.stroke();
        }
    }

}

export default Rectangle;