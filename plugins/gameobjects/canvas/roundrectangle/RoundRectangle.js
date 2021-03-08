import Canvas from '../canvas/Canvas.js';
import DrawRoundRectangle from '../../../utils/canvas/DrawRoundRectangle.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle extends Canvas {
    constructor(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
        super(scene, x, y, width, height);
        this.type = 'rexRoundRectangleCanvas';

        var radius = GetValue(radiusConfig, 'radius', radiusConfig);
        var iteration = GetValue(radiusConfig, 'iteration', undefined);
        this.setRadius(radius);
        this.setIteration(iteration);
        this.setFillStyle(fillStyle, fillColor2, isHorizontalGradient);
        this.setStrokeStyle(strokeStyle, lineWidth);
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty |= (this._radius != value);
        this._radius = value;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    get iteration() {
        return this._iteration;
    }

    set iteration(value) {
        this.dirty |= (this._iteration != value);
        this._iteration = value;
    }

    setIteration(iteration) {
        this.iteration = iteration;
        return this;
    }

    get fillStyle() {
        return this._fillStyle;
    }

    set fillStyle(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._fillStyle != value);
        this._fillStyle = value;
    }

    get fillColor2() {
        return this._fillColor2;
    }

    set fillColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._fillColor2 != value);
        this._fillColor2 = value;
    }

    get isHorizontalGradient() {
        return this._fillStyle;
    }

    set isHorizontalGradient(value) {
        this.dirty |= (this._isHorizontalGradient != value);
        this._isHorizontalGradient = value;
    }

    setFillStyle(fillStyle, fillColor2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }
        this.fillStyle = fillStyle;
        this.fillColor2 = fillColor2;
        this.isHorizontalGradient = isHorizontalGradient;
        return this;
    }

    get strokeStyle() {
        return this._strokeStyle;
    }

    set strokeStyle(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._strokeStyle != value);
        this._strokeStyle = value;
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this.dirty |= (this._lineWidth != value);
        this._lineWidth = value;
    }

    setStrokeStyle(strokeStyle, lineWidth) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        return this;
    }

    updateTexture() {
        this.clear();
        var lineWidth = this.lineWidth;
        if (!this.strokeStyle) {
            lineWidth = 0;
        }
        var x = lineWidth / 2;
        var width = this.width - lineWidth;
        var height = this.height - lineWidth;

        DrawRoundRectangle(
            this.canvas, this.context,
            x, x,
            width, height,
            this.radius,
            this.fillStyle,
            this.strokeStyle,
            lineWidth,
            this.fillColor2,
            this.isHorizontalGradient,
            this.iteration,
        );
        super.updateTexture();
        return this;
    }
}

export default RoundRectangle;