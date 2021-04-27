import GetStyle from '../../../utils/canvas/GetStyle.js';
import DrawRoundRectangleBackground from '../utils/DrawRoundRectangleBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Background {
    constructor(parent, config) {
        this.parent = parent;

        this.setColor(
            GetValue(config, 'backgroundColor', null),
            GetValue(config, 'backgroundColor2', null),
            GetValue(config, 'backgroundHorizontalGradient', true)
        );

        this.setStrokeColor(
            GetValue(config, 'backgroundStrokeColor', null),
            GetValue(config, 'backgroundStrokeThickness', 2)
        );

        this.setCornerRadius(
            GetValue(config, 'backgroundCornerRadius', 0),
            GetValue(config, 'backgroundCornerIteration', null)
        );
    }

    get canvas() {
        return this.parent.canvas;
    }

    get context() {
        return this.parent.context;
    }

    set color(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.parent.dirty = this.parent.dirty || (this._color != value);
        this._color = value;
    }

    get color() {
        return this._color;
    }

    set color2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.parent.dirty = this.parent.dirty || (this._color2 != value);
        this._color2 = value;
    }

    get color2() {
        return this._color2;
    }

    set horizontalGradient(value) {
        this.parent.dirty = this.parent.dirty || (this._horizontalGradient != value);
        this._horizontalGradient = value;
    }

    get horizontalGradient() {
        return this._horizontalGradient;
    }

    setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
    }

    set strokeColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.parent.dirty = this.parent.dirty || (this._strokeColor != value);
        this._strokeColor = value;
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeThickness(value) {
        this.parent.dirty = this.parent.dirty || (this._strokeThickness != value);
        this._strokeThickness = value;
    }

    get strokeThickness() {
        return this._strokeThickness;
    }

    setStrokeColor(color, lineWidth) {
        this.strokeColor = color;
        this.strokeThickness = lineWidth;
        return this;
    }

    set cornerRadius(value) {
        this.parent.dirty = this.parent.dirty || (this._cornerRadius != value);
        this._cornerRadius = value;
    }

    get cornerRadius() {
        return this._cornerRadius;
    }

    set cornerIteration(value) {
        this.parent.dirty = this.parent.dirty || (this._cornerIteration != value);
        this._cornerIteration = value;
    }

    get cornerIteration() {
        return this._cornerIteration;
    }

    setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
    }

    draw() {
        DrawRoundRectangleBackground(
            this.parent,
            this.color,
            this.strokeColor,
            this.strokeThickness,
            this.cornerRadius,
            this.color2,
            this.horizontalGradient,
            this.cornerIteration
        );
    }
}

export default Background;