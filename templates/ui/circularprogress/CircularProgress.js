import Canvas from '../canvas/Canvas.js';
import GetStyle from '../../../plugins/utils/canvas/GetStyle.js';
import DrawCicle from '../../../plugins/utils/canvas/DrawCircle.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

const DefaultStartAngle = Phaser.Math.DegToRad(270);

class CircularProgress extends Canvas {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var radius = GetValue(config, 'radius', 1);
        var width = radius * 2;
        super(scene, x, y, width, width);

        this.setRadius(radius);
        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setColor(GetValue(config, 'color', undefined));
        this.setCenterColor(GetValue(config, 'centerColor', undefined));

        this.setThickness(GetValue(config, 'thickness', 0.2));
        this.setStartAngle(GetValue(config, 'startAngle', DefaultStartAngle));
        this.setReverse(GetValue(config, 'reverse', false));
        this.setValue(GetValue(config, 'value', 0));
    }

    resize(width, height) {
        if (height !== undefined) {
            width = Math.min(width, height);
        }
        width = Math.floor(width);
        if (width === this.width) {
            return this;
        }

        super.resize(width, width);
        this.setRadius(width / 2);
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(value, 0, 1);
        this.dirty |= (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty |= (this._radius != value);
        this._radius = value;
        this.resize(value * 2);
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._trackColor != value);
        this._trackColor = value;
    }

    setTrackColor(color) {
        this.trackColor = color;
        return this;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._color != value);
        this._color = value;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(value) {
        this.dirty |= (this._startAngle != value);
        this._startAngle = value;
    }

    setStartAngle(angle) {
        this.startAngle = angle;
        return this;
    }

    get reverse() {
        return this._reverse;
    }

    set reverse(value) {
        this.dirty |= (this._reverse != value);
        this._reverse = value;
    }

    setReverse(reverse) {
        this.reverse = reverse;
        return this;
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        value = Clamp(value, 0, 1);
        this.dirty |= (this._thickness != value);
        this._thickness = value;
    }

    setThickness(thickness) {
        this.thickness = thickness;
        return this;
    }

    get centerColor() {
        return this._centerColor;
    }

    set centerColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._centerColor != value);
        this._centerColor = value;
    }

    get centerColor2() {
        return this._centerColor2;
    }

    set centerColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._centerColor2 != value);
        this._centerColor2 = value;
    }

    setCenterColor(color, color2) {
        this.centerColor = color;
        this.centerColor2 = color2;
        return this;
    }

    updateTexture() {
        this.clear();

        var x = this.radius;
        var lineWidth = this.thickness * this.radius;

        if (this.trackColor) {
            var radius = this.radius - (lineWidth / 2);
            // Draw track
            DrawCicle(
                this.canvas, this.context,
                x, x,
                radius, radius,
                undefined,
                this.trackColor,
                lineWidth
            );
        }

        // Draw main CircularProgress
        if (this.color) {
            var radius = this.radius - (lineWidth / 2);
            var endAngle = (2 * Math.PI * this.value) + this.startAngle;
            DrawCicle(
                this.canvas, this.context,
                x, x,
                radius, radius,
                undefined,
                this.color,
                lineWidth,
                this.startAngle, endAngle, this.reverse
            );
        }

        // Draw center CircularProgress
        if (this.centerColor) {
            var radius = (1 - this.thickness) * this.radius;
            var fillStyle;
            if (this.centerColor2) {
                fillStyle = this.context.createRadialGradient(x, x, 0, x, x, radius);
                fillStyle.addColorStop(0, this.centerColor);
                fillStyle.addColorStop(1, this.centerColor2);
            } else {
                fillStyle = this.centerColor;
            }

            DrawCicle(
                this.canvas, this.context,
                x, x,
                radius, radius,
                fillStyle
            );
        }

        super.updateTexture();
        return this;
    }
}

export default CircularProgress;