import Canvas from '../canvasbase/Canvas';
import ProgressBase from '../../../utils/progressbase/ProgressBase';
import GetStyle from '../../../utils/canvas/GetStyle';
import DrawContent from './DrawContent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class LineProgress extends ProgressBase(Canvas) {
    _barColor: any;
    _barColor2: any;
    _isHorizontalGradient: any;
    _rtl: any;
    _skewX: any;
    _trackColor: any;
    _trackStrokeColor: any;
    _trackStrokeThickness: any;
    barPoints: any;
    bootProgressBase: any;
    canvas: any;
    clear: any;
    context: any;
    dirty: any;
    setValue: any;
    trackPoints: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, barColor?: any, value?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        } else if (IsPlainObject(barColor)) {
            config = barColor;
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        }

        var resolution = GetValue(config, 'resolution', 1);

        super(scene, x, y, width, height, resolution);
        this.type = 'rexLineProgressCanvas';
        this.trackPoints = [];
        this.barPoints = [];

        this.bootProgressBase(config);

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(
            barColor,
            GetValue(config, 'barColor2', undefined),
            GetValue(config, 'isHorizontalGradient', undefined)
        );
        this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

        this.setSkewX(GetValue(config, 'skewX', 0));

        this.setRTL(GetValue(config, 'rtl', false));

        this.setValue(value);
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._trackColor != value);
        this._trackColor = value;
    }

    setTrackColor(color?: any) {
        this.trackColor = color;
        return this;
    }

    get trackStrokeColor() {
        return this._trackStrokeColor;
    }

    set trackStrokeColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._trackStrokeColor != value);
        this._trackStrokeColor = value;
    }

    get trackStrokeThickness() {
        return this._trackStrokeThickness;
    }

    set trackStrokeThickness(value) {
        this.dirty = this.dirty || (this._trackStrokeThickness != value);
        this._trackStrokeThickness = value;
    }

    setTrackStroke(lineWidth?: any, color?: any) {
        this.trackStrokeThickness = lineWidth;
        this.trackStrokeColor = color;
        return this;
    }

    get barColor() {
        return this._barColor;
    }

    set barColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._barColor != value);
        this._barColor = value;
    }

    get barColor2() {
        return this._barColor2;
    }

    set barColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._barColor2 != value);
        this._barColor2 = value;
    }

    get isHorizontalGradient() {
        return this._isHorizontalGradient;
    }

    set isHorizontalGradient(value) {
        this.dirty |= (this._isHorizontalGradient != value);
        this._isHorizontalGradient = value;
    }

    setBarColor(color?: any, color2?: any, isHorizontalGradient?: any) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.barColor = color;
        this.barColor2 = color2;
        this.isHorizontalGradient = isHorizontalGradient;
        return this;
    }

    get skewX() {
        return this._skewX;
    }

    set skewX(value) {
        this.dirty = this.dirty || (this._skewX != value);
        this._skewX = value;
    }

    setSkewX(value?: any) {
        this.skewX = value;
        return this;
    }

    get rtl() {
        return this._rtl;
    }

    set rtl(value) {
        value = !!value;
        this.dirty = this.dirty || (this._rtl != value);
        this._rtl = value;
    }

    setRTL(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.rtl = enable;
        return this;
    }

    updateTexture() {
        super.updateTexture(function() {
            this.clear();
            DrawContent.call(this);
        }, this);
        return this;
    }
}

export default LineProgress;