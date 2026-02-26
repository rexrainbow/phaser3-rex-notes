import BaseGeom from '../base/BaseGeom.js';
import FillPathWebGL from '../../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL.js';
import FillPathCanvas from '../../../utils/render/FillPathCanvas.js';
import StrokePathCanvas from '../../../utils/render/StrokePathCanvas.js';
import StrokePathMethods from '../../../utils/strokepath/StrokePathMethods.js';

const Earcut = Phaser.Geom.Polygon.Earcut;

class Triangle extends BaseGeom {
    constructor(x0, y0, x1, y1, x2, y2) {
        if (x0 === undefined) { x0 = 0; }
        if (y0 === undefined) { y0 = 0; }
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.pathIndexes = [];
        this.closePath = true;

        this.setP0(x0, y0);
        this.setP1(x1, y1);
        this.setP2(x2, y2);
    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.dirty = this.dirty || (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.dirty = this.dirty || (this._y0 !== value);
        this._y0 = value;
    }

    setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.dirty = this.dirty || (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.dirty = this.dirty || (this._y1 !== value);
        this._y1 = value;
    }

    setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    get x2() {
        return this._x2;
    }

    set x2(value) {
        this.dirty = this.dirty || (this._x2 !== value);
        this._x2 = value;
    }

    get y2() {
        return this._y2;
    }

    set y2(value) {
        this.dirty = this.dirty || (this._y2 !== value);
        this._y2 = value;
    }

    setP2(x, y) {
        this.dirty = this.dirty || (this.x2 !== x) || (this.y2 !== y);
        this.x2 = x;
        this.y2 = y;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);
        this.pathIndexes = Earcut(this.pathData);

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillPathCanvas(ctx, this, dx, dy);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
}

Object.assign(
    Triangle.prototype,
    StrokePathMethods,
)

export default Triangle;
