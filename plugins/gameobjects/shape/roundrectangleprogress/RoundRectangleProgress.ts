import BaseShapes from '../shapes/BaseShapes';
import ProgressBase from '../../../utils/progressbase/ProgressBase';
import { Lines } from '../shapes/geoms/index';
import UpdateShapes from './methods/UpdateShapes';
import RoundRectangleGeom from '../../../geom/roundrectangle/RoundRectangle';
import GetOrientationMode from '../../../utils/orientation/GetOrientationMode';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class RoundRectangleProgress extends ProgressBase(BaseShapes) {
    _barColor: any;
    _iteration: any;
    _orientation: any;
    _rtl: any;
    _trackColor: any;
    _trackStrokeColor: any;
    _trackStrokeThickness: any;
    bootProgressBase: any;
    dirty: any;
    rrGeom: any;
    setValue: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, radiusConfig?: any, barColor?: any, value?: any, config?: any) {
        if (IsPlainObject(x)) {
            config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            radiusConfig = config.radius;
            barColor = config.barColor;
            value = config.value;
        } else if (IsPlainObject(width)) {
            config = width;

            width = config.width;
            height = config.height;
            radiusConfig = config.radius;
            barColor = config.barColor;
            value = config.value;
        } else if (IsPlainObject(radiusConfig)) {
            config = radiusConfig;

            radiusConfig = config.radius;
            barColor = config.barColor;
            value = config.value;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }
        if (radiusConfig === undefined) { radiusConfig = 0; }
        if (value === undefined) { value = 0; }

        super(scene, x, y, width, height, config);
        this.type = 'rexRoundRectangleProgress';
        this.rrGeom = new RoundRectangleGeom();  // For radiusConfig only

        this.bootProgressBase(config);

        this
            .addShape((new Lines()).setName('trackFill'))
            .addShape((new Lines()).setName('bar'))
            .addShape((new Lines()).setName('trackStroke'))

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(barColor);
        this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

        this.setOrientation(GetValue(config, 'orientation', 0));
        this.setRTL(GetValue(config, 'rtl', false));

        this.setRadius(radiusConfig);

        this.setIteration(GetValue(radiusConfig, 'iteration', undefined));

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

    get orientation() {
        return this._orientation;
    }

    set orientation(value) {
        value = GetOrientationMode(value);
        this.dirty = this.dirty || (this._orientation != value);
        this._orientation = value;
    }

    setOrientation(value?: any) {
        this.orientation = value;
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

    get radius() {
        return this.rrGeom.radius;
    }

    set radius(value) {
        this.rrGeom.setRadius(value);
        this.dirty = true;
    }

    get radiusTL() {
        return this.rrGeom.radiusTL;
    }

    set radiusTL(value) {
        this.rrGeom.radiusTL = value;
        this.dirty = true;
    }

    get radiusTR() {
        return this.rrGeom.radiusTR;
    }

    set radiusTR(value) {
        this.rrGeom.radiusTR = value;
        this.dirty = true;
    }

    get radiusBL() {
        return this.rrGeom.radiusBL;
    }

    set radiusBL(value) {
        this.rrGeom.radiusBL = value;
        this.dirty = true;
    }

    get radiusBR() {
        return this.rrGeom.radiusBR;
    }

    set radiusBR(value) {
        this.rrGeom.radiusBR = value;
        this.dirty = true;
    }

    setRadius(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    setRadiusTL(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTL = value;
        return this;
    }

    setRadiusTR(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTR = value;
        return this;
    }

    setRadiusBL(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBL = value;
        return this;
    }

    setRadiusBR(value?: any) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBR = value;
        return this;
    }

    get cornerRadius() {
        return this.rrGeom.cornerRadius;
    }

    set cornerRadius(value) {
        this.radius = value;
    }

    setCornerRadius(value?: any) {
        return this.setRadius(value);
    }

    get iteration() {
        return this._iteration;
    }

    set iteration(value) {
        // Set iteration first time
        if (this._iteration === undefined) {
            this._iteration = value;
            return;
        }

        // Change iteration value
        if (this._iteration === value) {
            return;
        }

        this._iteration = value;
        this.dirty = true;
    }

    setIteration(iteration?: any) {
        if (iteration === undefined) {
            iteration = 6;
        }
        this.iteration = iteration;
        return this;
    }
}

var Methods = {
    updateShapes: UpdateShapes,
}

Object.assign(
    RoundRectangleProgress.prototype,
    Methods,
)

export default RoundRectangleProgress;