import BaseShapes from '../shapes/BaseShapes.js';
import ProgressBase from '../../../utils/progressbase/ProgressBase.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Clamp = Phaser.Math.Clamp;

const DefaultStartAngle = Phaser.Math.DegToRad(270);

class CircularProgress extends ProgressBase(BaseShapes) {
    constructor(scene, x, y, radius, barColor, value, config) {
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

    resize(width, height) {
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

    setRadius(radius) {
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


    setTrackColor(color, alpha) {
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

    setBarColor(color, alpha) {
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

    setStartAngle(angle) {
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

    setAnticlockwise(anticlockwise) {
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

    setThickness(thickness) {
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

    setCenterColor(color, alpha) {
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