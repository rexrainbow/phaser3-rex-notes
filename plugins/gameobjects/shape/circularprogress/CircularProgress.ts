import BaseShapes from '../shapes/BaseShapes';
import ProgressBase from '../../../utils/progressbase/ProgressBase';
import ShapesUpdateMethods from './ShapesUpdateMethods';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const Clamp = PhaserMath.Clamp;

const DefaultStartAngle = PhaserMath.DegToRad(270);

class CircularProgress extends ProgressBase(BaseShapes) {
    width: any;

    _anticlockwise: any;
    _barAlpha: any;
    _barColor: any;
    _centerAlpha: any;
    _centerColor: any;
    _radius: any;
    _startAngle: any;
    _thickness: any;
    _trackAlpha: any;
    _trackColor: any;
    bootProgressBase: any;
    buildShapes: any;
    dirty: any;
    iterations: any;
    setValue: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, radius?: any, barColor?: any, value?: any, config?: any) {
        var barAlpha;
        var trackColor, trackAlpha;
        var centerColor, centerAlpha;
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            radius = GetValue(config, 'radius', 1);
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        }

        barAlpha = GetValue(config, 'barAlpha', 1);
        trackColor = GetValue(config, 'trackColor', undefined);
        trackAlpha = GetValue(config, 'trackAlpha', 1);
        centerColor = GetValue(config, 'centerColor', undefined);
        centerAlpha = GetValue(config, 'centerAlpha', 1);

        if (radius === undefined) { radius = 1; }

        var width = radius * 2;
        super(scene, x, y, width, width);
        this.type = 'rexCircularProgress';

        this.bootProgressBase(config);

        this.setRadius(radius);
        this.setTrackColor(trackColor, trackAlpha);
        this.setBarColor(barColor, barAlpha);
        this.setCenterColor(centerColor, centerAlpha);

        this.setThickness(GetValue(config, 'thickness', 0.2));
        this.setStartAngle(GetValue(config, 'startAngle', DefaultStartAngle));
        this.setAnticlockwise(GetValue(config, 'anticlockwise', false));

        this.iterations = GetValue(config, 'iterations', 128);

        this.buildShapes();

        this.setValue(value);
    }

    resize(width?: any, height?: any) {
        width = Math.floor(Math.min(width, height));
        if (width === this.width) {
            return this;
        }

        super.resize(width, width);
        this.setRadius(width / 2);
        return this;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty = this.dirty || (this._radius != value);
        this._radius = value;
        var width = value * 2;
        this.resize(width, width);
    }

    setRadius(radius?: any) {
        this.radius = radius;
        return this;
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
        this.dirty = this.dirty || (this._trackColor != value);
        this._trackColor = value;
    }

    get trackAlpha() {
        return this._trackColor;
    }

    set trackAlpha(value) {
        this.dirty = this.dirty || (this._trackAlpha != value);
        this._trackAlpha = value;
    }


    setTrackColor(color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.trackColor = color;
        this.trackAlpha = alpha;
        return this;
    }

    get barColor() {
        return this._barColor;
    }

    set barColor(value) {
        this.dirty = this.dirty || (this._barColor != value);
        this._barColor = value;
    }

    get barAlpha() {
        return this._barAlpha;
    }

    set barAlpha(value) {
        this.dirty = this.dirty || (this._barAlpha != value);
        this._barAlpha = value;
    }

    setBarColor(color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.barColor = color;
        this.barAlpha = alpha;
        return this;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(value) {
        this.dirty = this.dirty || (this._startAngle != value);
        this._startAngle = value;
    }

    setStartAngle(angle?: any) {
        this.startAngle = angle;
        return this;
    }

    get anticlockwise() {
        return this._anticlockwise;
    }

    set anticlockwise(value) {
        this.dirty = this.dirty || (this._anticlockwise != value);
        this._anticlockwise = value;
    }

    setAnticlockwise(anticlockwise?: any) {
        if (anticlockwise === undefined) {
            anticlockwise = true;
        }
        this.anticlockwise = anticlockwise;
        return this;
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        value = Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._thickness != value);
        this._thickness = value;
    }

    setThickness(thickness?: any) {
        this.thickness = thickness;
        return this;
    }

    get centerColor() {
        return this._centerColor;
    }

    set centerColor(value) {
        this.dirty = this.dirty || (this._centerColor != value);
        this._centerColor = value;
    }

    get centerAlpha() {
        return this._centerAlpha;
    }

    set centerAlpha(value) {
        this.dirty = this.dirty || (this._centerAlpha != value);
        this._centerAlpha = value;
    }

    setCenterColor(color?: any, alpha?: any) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.centerColor = color;
        this.centerAlpha = alpha;
        return this;
    }

}

Object.assign(
    CircularProgress.prototype,
    ShapesUpdateMethods,
)

export default CircularProgress;