import BaseShapes from '../shapes/BaseShapes.js';
import ProgressBase from '../../../utils/progressbase/ProgressBase.js';
import { Lines } from '../shapes/geoms/index.js';
import UpdateShapes from './methods/UpdateShapes.js';
import RoundRectangleGeom from '../../../geom/roundrectangle/RoundRectangle.js';
import GetOrientationMode from '../../../utils/orientation/GetOrientationMode.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class RoundRectangleProgress extends ProgressBase(BaseShapes) {
    constructor(scene, x, y, width, height, radiusConfig, barColor, value, config) {
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

    setTrackColor(color) {
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

    setTrackStroke(lineWidth, color) {
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

    setBarColor(color) {
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

    setOrientation(value) {
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

    setRTL(enable) {
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

    setRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    setRadiusTL(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTL = value;
        return this;
    }

    setRadiusTR(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTR = value;
        return this;
    }

    setRadiusBL(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBL = value;
        return this;
    }

    setRadiusBR(value) {
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

    setCornerRadius(value) {
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

    setIteration(iteration) {
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