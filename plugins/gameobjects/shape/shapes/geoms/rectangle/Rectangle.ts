import BaseGeom from '../base/BaseGeom';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL';
import FillStyleCanvas from '../../../utils/render/FillStyleCanvas';
import StrokePathCanvas from '../../../utils/render/StrokePathCanvas';
import StrokePathMethods from '../../../utils/strokepath/StrokePathMethods';

import { Renderer as PhaserRenderer } from 'phaser';
var Utils = PhaserRenderer.WebGL.Utils;

class Rectangle extends BaseGeom {
    _height: any;
    _width: any;
    _x: any;
    _y: any;
    buildStrokePath: any;
    closePath: any;
    dashOffset: any;
    dashPattern: any;
    dirty: any;
    fillAlpha: any;
    fillColor: any;
    isDashed: any;
    isFilled: any;
    isStroked: any;
    pathData: any;
    strokePathData: any;
    strokePathMask: any;

    constructor(x?: any, y?: any, width?: any, height?: any) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = width; }

        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.closePath = true;

        this.setTopLeftPosition(x, y);
        this.setSize(width, height);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.dirty = this.dirty || (this._x !== value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.dirty = this.dirty || (this._y !== value);
        this._y = value;
    }

    setTopLeftPosition(x?: any, y?: any) {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.dirty = this.dirty || (this._width !== value);
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.dirty = this.dirty || (this._height !== value);
        this._height = value;
    }

    setSize(width?: any, height?: any) {
        this.width = width;
        this.height = height;
        return this;
    }

    get centerX() {
        return this.x + (this.width / 2);
    }

    set centerX(value) {
        this.x = value - (this.width / 2);
    }

    get centerY() {
        return this.y + (this.height / 2);
    }

    set centerY(value) {
        this.y = value - (this.height / 2);
    }

    setCenterPosition(x?: any, y?: any) {
        this.centerX = x;
        this.centerY = y;
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

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(drawingContext?: any, submitter?: any, calcMatrix?: any, gameObject?: any, alpha?: any, dx?: any, dy?: any) {
        if (this.isFilled) {
            var fillTintColor = Utils.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * alpha);

            var FillRect = gameObject.customRenderNodes.FillRect || gameObject.defaultRenderNodes.FillRect;

            FillRect.run(
                drawingContext,
                calcMatrix,
                submitter,
                -dx + this.x,
                -dy + this.y,
                this.width,
                this.height,
                fillTintColor,
                fillTintColor,
                fillTintColor,
                fillTintColor
            );
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx?: any, dx?: any, dy?: any) {
        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fillRect(-dx, -dy, this.width, this.height);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
}

Object.assign(
    Rectangle.prototype,
    StrokePathMethods,
)

export default Rectangle;