import Canvas from '../canvas/Canvas.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';
import { GetPadding, SetPadding } from '../../../utils/padding/PaddingMethods.js'
import DrawRoundRectangleBackground from '../utils/DrawRoundRectangleBackground.js';
import TextStyle from './TextStyle.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class DynamicText extends Canvas {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            fixedWidth = GetValue(config, 'width', 0);
            fixedHeight = GetValue(config, 'height', 0);
        }

        var width = (fixedWidth === 0) ? 1 : fixedWidth;
        var height = (fixedHeight === 0) ? 1 : fixedHeight;
        super(scene, x, y, width, height);
        this.type = 'rexDynamicCanvasText';
        this.autoRound = true;
        this.padding = {};
        this.defaultTextStyle = new TextStyle(config);
        this.currentTextStyle = new TextStyle(config);


        this.setFixedSize(fixedWidth, fixedHeight);
        this.setBackgroundColor(
            GetValue(config, 'backgroundColor', null),
            GetValue(config, 'backgroundColor2', null),
            GetValue(config, 'backgroundHorizontalGradient', true)
        );
        this.setBackgroundStrokeColor(
            GetValue(config, 'backgroundStrokeColor', null),
            GetValue(config, 'backgroundStrokeLineWidth', 2)
        );
        this.setBackgroundCornerRadius(
            GetValue(config, 'backgroundCornerRadius', 0),
            GetValue(config, 'backgroundCornerIteration', null)
        );
        this.setPadding(
            GetValue(config, 'padding', 0)
        );
    }

    setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if ((width > 0) && (height > 0)) {
            this.setSize(width, height);
        }

        return this;
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

    get backgroundColor2() {
        return this._backgroundColor2;
    }

    set backgroundHorizontalGradient(value) {
        this.dirty = this.dirty || (this._backgroundHorizontalGradient != value);
        this._backgroundHorizontalGradient = value;
    }

    get backgroundHorizontalGradient() {
        return this._backgroundHorizontalGradient;
    }

    setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.backgroundColor = color;
        this.backgroundColor2 = color2;
        this.backgroundHorizontalGradient = isHorizontalGradient;
        return this;
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

    setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = color;
        this.backgroundStrokeLineWidth = lineWidth;
        return this;
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

    setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;
        return this;
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

    getPadding(key) {
        return GetPadding(this.padding, key);
    }

    setDefaultTextStyle(style) {
        this.defaultTextStyle.rest(style);
        return this;
    }

    restoreToDefaultTextStyle() {
        this.currentTextStyle.reset(this.defaultTextStyle.toJSON());
        return this;
    }

    modifyTextStyle(style) {
        this.currentTextStyle.modify(style);
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