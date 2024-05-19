import Render from './render/Render.js';

const Shape = Phaser.GameObjects.Shape;

class PolygnBase extends Shape {
    get fillColor() {
        return this._fillColor;
    }

    set fillColor(value) {
        this._fillColor = value;
        this.isFilled = (value != null) && (this._fillAlpha > 0);
    }

    get fillAlpha() {
        return this._fillAlpha;
    }

    set fillAlpha(value) {
        this._fillAlpha = value;
        this.isFilled = (value > 0) && (this._fillColor != null);
    }

    // Fully override setFillStyle method
    setFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.fillColor = color;
        this.fillAlpha = alpha;

        return this;
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(value) {
        this._strokeColor = value;
        this.isStroked = (value != null) && (this._strokeAlpha > 0) && (this._lineWidth > 0);
    }

    get strokeAlpha() {
        return this._strokeAlpha;
    }

    set strokeAlpha(value) {
        this._strokeAlpha = value;
        this.isStroked = (value > 0) && (this._strokeColor != null) && (this._lineWidth > 0);
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this._lineWidth = value;
        this.isStroked = (value > 0) && (this._strokeColor != null);
    }

    // Fully override setStrokeStyle method
    setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;

        return this;
    }

    updateData() {
        return this;
    }

    get width() {
        return this.geom.width;
    }
    set width(value) {
        this.resize(value, this.height);
    }

    get height() {
        return this.geom.height;
    }
    set height(value) {
        this.resize(this.width, value);
    }

    setSize(width, height) {
        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = width;
            input.hitArea.height = height;
        }
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

}

Object.assign(
    PolygnBase.prototype,
    Render
);

export default PolygnBase;