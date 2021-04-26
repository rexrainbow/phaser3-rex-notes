import Canvas from '../canvas/Canvas.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';
import { GetPadding, SetPadding } from '../../../utils/padding/PaddingMethods.js'
import DrawRoundRectangleBackground from '../utils/DrawRoundRectangleBackground.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class DynamicText extends Canvas {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        }
        super(scene, x, y, width, height);
        this.type = 'rexDynamicCanvasText';
        this.autoRound = true;

        this.padding = {};
        this.setPadding(GetValue(config, 'padding', 0));
    }

    set backgroundColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._backgroundColor != value);
        this._backgroundColor = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._backgroundColor2 != value);
        this._backgroundColor2 = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundHorizontalGradient(value) {
        this.dirty = this.dirty || (this._backgroundHorizontalGradient != value);
        this._backgroundHorizontalGradient = value;
    }

    get backgroundHorizontalGradient() {
        return this._backgroundHorizontalGradient;
    }

    set backgroundStrokeColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._backgroundStrokeColor != value);
        this._backgroundStrokeColor = value;
    }

    get backgroundStrokeColor() {
        return this._backgroundStrokeColor;
    }

    set backgroundStrokeLineWidth(value) {
        this.dirty = this.dirty || (this._backgroundStrokeLineWidth != value);
        this._backgroundStrokeLineWidth = value;
    }

    get backgroundStrokeLineWidth() {
        return this._backgroundStrokeLineWidth;
    }

    set backgroundCornerRadius(value) {
        this.dirty = this.dirty || (this._backgroundCornerRadius != value);
        this._backgroundCornerRadius = value;
    }

    get backgroundCornerRadius() {
        return this._backgroundCornerRadius;
    }

    set backgroundCornerIteration(value) {
        this.dirty = this.dirty || (this._backgroundCornerIteration != value);
        this._backgroundCornerIteration = value;
    }

    get backgroundCornerIteration() {
        return this._backgroundCornerIteration;
    }

    setPadding(key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding(this.padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != this.padding.left) ||
            (paddingRight != this.padding.right) ||
            (paddingTop != this.padding.top) ||
            (paddingBottom != this.padding.bottom)
            ;
        return this;
    }

    updateTexture() {
        var ctx = this.context;

        this.clear();

        DrawRoundRectangleBackground(
            this,
            this.backgroundColor,
            this.backgroundStrokeColor,
            this.backgroundStrokeLineWidth,
            this.backgroundCornerRadius,
            this.backgroundColor2,
            this.backgroundHorizontalGradient,
            this.backgroundCornerIteration
        );

        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        ctx.save();
        ctx.beginPath();

        if ((paddingLeft > 0) || (paddingRight > 0) || (paddingTop > 0) || (paddingBottom > 0)) {
            ctx.rect(paddingLeft, padding.top, paddingRight - paddingLeft, paddingBottom - paddingTop);
            ctx.clip();
        }

        ctx.translate(paddingLeft, paddingTop);

        // Draw text & images

        ctx.restore();

        super.updateTexture();
        return this;
    }
}

export default DynamicText;