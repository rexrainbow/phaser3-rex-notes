import ProgressBase from '../utils/ProgressBase.js';
import { Line } from '../shapes/geoms';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class SimpleLineProgress extends ProgressBase {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        } else if (IsPlainObject(width)) {
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
        }

        super(scene, x, y, width, height, config);
        this.type = 'rexSimpleLineProgress';

        this
            .addShape((new Line()).setName('trackFill'))
            .addShape((new Line()).setName('bar'))
            .addShape((new Line()).setName('trackStroke'))

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(barColor);
        this.setTrackStroke(GetValue(config, 'trackThickness', 2), GetValue(config, 'trackStrokeColor', undefined));
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
        return this._trackStrokeColor;
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

    updateShapes() {
        var x = this.radius;
        var lineWidth = this.thickness * this.radius;
        var barRadius = this.radius - (lineWidth / 2);
        var centerRadius = this.radius - lineWidth;

        // Track shape
        var trackShape = this.getShape('track');
        if ((this.trackColor != null) && (lineWidth > 0)) {
            trackShape
                .setCenterPosition(x, x)
                .setRadius(barRadius)
                .lineStyle(lineWidth, this.trackColor);
        } else {
            trackShape.reset();
        }

        // Bar shape
        var barShape = this.getShape('bar');
        if ((this.barColor != null) && (barRadius > 0)) {
            var anticlockwise, startAngle, endAngle;
            if (this.value === 1) {
                anticlockwise = false;
                startAngle = 0;
                endAngle = 361;  // overshoot 1
            } else {
                anticlockwise = this.anticlockwise;
                startAngle = RadToDeg(this.startAngle);
                var deltaAngle = 360 * ((anticlockwise) ? (1 - this.value) : this.value);
                endAngle = deltaAngle + startAngle;
            }
            barShape
                .setCenterPosition(x, x)
                .setRadius(barRadius)
                .setAngle(startAngle, endAngle, anticlockwise)
                .lineStyle(lineWidth, this.barColor);
        } else {
            barShape.reset();
        }

        // Center shape
        var centerShape = this.getShape('center');
        if (this.centerColor && (centerRadius > 0)) {
            centerShape
                .setCenterPosition(x, x)
                .setRadius(centerRadius)
                .fillStyle(this.centerColor);
        } else {
            centerShape.reset();
        }
    }
}

export default SimpleLineProgress;