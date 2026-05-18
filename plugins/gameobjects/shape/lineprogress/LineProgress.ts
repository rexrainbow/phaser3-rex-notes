import BaseShapes from '../shapes/BaseShapes';
import ProgressBase from '../../../utils/progressbase/ProgressBase';
import { Lines } from '../shapes/geoms';
import UpdateShapes from './UpdateShapes';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class LineProgress extends ProgressBase(BaseShapes) {
    _barColor: any;
    _rtl: any;
    _skewX: any;
    _trackColor: any;
    _trackStrokeColor: any;
    _trackStrokeThickness: any;
    bootProgressBase: any;
    dirty: any;
    setValue: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, barColor?: any, value?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            barColor = config.barColor;
            value = config.value;
        } else if (IsPlainObject(width)) {
            config = width;

            width = config.width;
            height = config.height;
            barColor = config.barColor;
            value = config.value;
        } else if (IsPlainObject(barColor)) {
            config = barColor;

            barColor = config.barColor;
            value = config.value;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = width; }
        if (value === undefined) { value = 0; }

        super(scene, x, y, width, height, config);
        this.type = 'rexLineProgress';

        this.bootProgressBase(config);

        this
            .addShape((new Lines()).setName('trackFill'))
            .addShape((new Lines()).setName('bar'))
            .addShape((new Lines()).setName('trackStroke'))

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(barColor);
        this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

        this.setSkewX(GetValue(config, 'skewX', 0));

        this.setRTL(GetValue(config, 'rtl', false));

        this.setValue(value);
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
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
        this.dirty = this.dirty || (this._barColor != value);
        this._barColor = value;
    }

    setBarColor(color?: any) {
        this.barColor = color;
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

}

var Methods = {
    updateShapes: UpdateShapes,
}

Object.assign(
    LineProgress.prototype,
    Methods,
)

export default LineProgress;