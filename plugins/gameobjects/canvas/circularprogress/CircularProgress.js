import Canvas from '../canvas/Canvas.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';
import DrawCicle from '../../../utils/canvas/DrawCircle.js';
import DrawText from '../../../utils/canvas/DrawText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Clamp = Phaser.Math.Clamp;

const DefaultStartAngle = Phaser.Math.DegToRad(270);

class CircularProgress extends Canvas {
    constructor(scene, x, y, radius, color, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            radius = GetValue(config, 'radius', 1);
            color = GetValue(config, 'color', undefined);
        }
        var width = radius * 2;
        super(scene, x, y, width, width);

        this.setRadius(radius);
        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setColor(color);
        this.setCenterColor(GetValue(config, 'centerColor', undefined));

        this.setThickness(GetValue(config, 'thickness', 0.2));
        this.setStartAngle(GetValue(config, 'startAngle', DefaultStartAngle));
        this.setReverse(GetValue(config, 'reverse', false));

        this.setTextColor(GetValue(config, 'textColor', undefined));
        this.setTextStrokeColor(GetValue(config, 'textStrokeColor', undefined), GetValue(config, 'textStrokeThickness', undefined));
        this.setTextFont(GetValue(config, 'textSize', '16px'), GetValue(config, 'textFamily', 'Courier'), GetValue(config, 'textStyle', ''));
        this.setTextFormatCallback(GetValue(config, 'textFormatCallback', DefaultTextFormatCallback), GetValue(config, 'textFormatCallbackScope', undefined));

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

    get textColor() {
        return this._textColor;
    }

    set textColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._textColor != value);
        this._textColor = value;
    }

    setTextColor(color) {
        this.textColor = color;
        return this;
    }

    get textStrokeColor() {
        return this._textStrokeColor;
    }

    set textStrokeColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._textStrokeColor != value);
        this._textStrokeColor = value;
    }

    get textStrokeThickness() {
        return this._textStrokeThickness;
    }

    set textStrokeThickness(value) {
        this.dirty |= (this._textStrokeThickness != value);
        this._textStrokeThickness = value;
    }

    setTextStrokeColor(color, thickness) {
        if (thickness === undefined) {
            thickness = 2;
        }
        this.textStrokeColor = color;
        this.textStrokeThickness = thickness;
        return this;
    }

    get textFont() {
        return this._textFont;
    }

    set textFont(value) {
        this.dirty |= (this._textFont != value);
        this._textFont = value;
    }

    setTextFont(fontSize, fontFamily, fontStyle) {
        var font = fontStyle + ' ' + fontSize + ' ' + fontFamily;
        this.textFont = font;
        return this;
    }

    setTextFormatCallback(callback, scope) {
        this.textFormatCallback = callback;
        this.textFormatCallbackScope = scope;
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

        // Draw text
        if (this.textColor || this.textStrokeColor) {
            var text;
            if (this.textFormatCallbackScope) {
                text = this.textFormatCallback(this.value);
            } else {
                text = this.textFormatCallback.call(this.textFormatCallbackScope, this.value);
            }
            DrawText(
                this.canvas, this.context,
                x, x,
                text,
                'center',
                this.textFont,
                this.textColor,
                this.textStrokeColor, this.textStrokeThickness
            )
        }

        super.updateTexture();
        return this;
    }
}

var DefaultTextFormatCallback = function (value) {
    return `${Math.floor(value * 100)}%`;
}

export default CircularProgress;