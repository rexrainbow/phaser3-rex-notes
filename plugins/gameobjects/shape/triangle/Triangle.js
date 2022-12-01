import BaseShapes from '../shapes/BaseShapes.js';
import ShapesUpdateMethods from './ShapesUpdateMethods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg

class Triangle extends BaseShapes {
    constructor(scene, x, y, width, height, fillColor, fillAlpha) {
        var strokeColor, strokeAlpha, strokeWidth, radius, direction;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;

            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;

            radius = config.radius;
            direction = config.direction;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }
        if (radius === undefined) { radius = 1; }
        if (direction === undefined) { direction = 0; }

        super(scene, x, y, width, height);
        this.type = 'rexTriangle';

        this.setRadius(radius);

        this.setFillStyle(fillColor, fillAlpha);

        if ((strokeColor !== undefined) && (strokeWidth === undefined)) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        this.setDirection(direction);

        this.buildShapes();

    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty = this.dirty || (this._radius != value);
        this._radius = value;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    get verticeRotation() {
        return this._verticeRotation;
    }

    set verticeRotation(value) {
        this.dirty = this.dirty || (this._verticeRotation != value);
        this._verticeRotation = value;
    }

    setVerticeRotation(rotation) {
        this.verticeRotation = rotation;
        return this;
    }

    get verticeAngle() {
        return RadToDeg(this.verticeRotation);
    }

    set verticeAngle(value) {
        this.verticeRotation = DegToRad(value);
    }

    setVerticeAngle(angle) {
        this.verticeAngle = angle;
        return this;
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this._direction = value;
        this.verticeRotation = DirectionToRadMap[value];
    }

    setDirection(direction) {
        this.direction = direction;
        return this;
    }
}

const RAD_RIGHT = DegToRad(0);
const RAD_DOWN = DegToRad(90);
const RAD_LEFT = DegToRad(180);
const RAD_UP = DegToRad(270);
const DirectionToRadMap = {
    0: RAD_RIGHT, right: RAD_RIGHT,
    1: RAD_DOWN, down: RAD_DOWN,
    2: RAD_LEFT, left: RAD_LEFT,
    3: RAD_UP, up: RAD_UP,
}

Object.assign(
    Triangle.prototype,
    ShapesUpdateMethods
)

export default Triangle;