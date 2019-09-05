import GetSceneObject from '../../utils/system/GetSceneObject.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BetweenPoints = Phaser.Math.Angle.BetweenPoints;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;

class Slider {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this._value = undefined;
        this.endPoints = [{
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
        ];

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setValue(GetValue(o, "value", 0));
        var endPoints = GetValue(o, "endPoints", undefined);
        if (endPoints !== undefined) {
            this.setEndPoints(endPoints);
        }
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    toJSON() {
        return {
            value: this.value,
            endPoints: this.endPoints,
            enable: this.enable
        };
    }

    boot() {
        this.gameObject.on('drag', this.onDragging, this);
        this.gameObject.once('destroy', this.destroy, this);
    }

    shutdown() {
        this.destroyEventEmitter();
        this.gameObject = undefined;
        this.scene = undefined;
        // gameObject event 'drag' will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        if (this.enable === e) {
            return this;
        }

        this.enable = e;
        this.scene.input.setDraggable(this.gameObject, e);
        return this;
    }

    setEndPoints(p0x, p0y, p1x, p1y) {
        var points = this.endPoints;
        if (typeof (p0x) === 'number') {
            points[0].x = p0x;
            points[0].y = p0y;
            points[1].x = p1x;
            points[1].y = p1y;
        } else if (Array.isArray(p0x)) { // single array with 2 points
            points[0] = p0x[0];
            points[1] = p0x[1];
        } else {
            points[0] = p0x;
            points[1] = p0y;
        }
        this.axisRotation = BetweenPoints(points[0], points[1]);
        this.updatePos();
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(value, 0, 1);
        if (value === this._value) {
            return;
        }

        var oldValue = this._value;
        this._value = value
        this.updatePos(this._value);
        this.emit('valuechange', this._value, oldValue);
    }

    setValue(value, min, max) {
        if (min !== undefined) {
            value = Percent(value, min, max);
        }
        this.value = value;
        return this;
    }

    addValue(inc, min, max) {
        if (min !== undefined) {
            inc = Percent(inc, min, max);
        }
        this.value += inc;
        return this;
    }

    getValue(min, max) {
        var value = this.value;
        if (min !== undefined) {
            value = Linear(min, max, value);
        }
        return value;
    }

    get isDragging() {
        return (this.gameObject.input.dragState > 0);
    }

    onDragging(pointer, dragX, dragY) {
        var endPoints = this.endPoints;
        var newValue;
        if (endPoints[0].y === endPoints[1].y) {
            var min = Math.min(endPoints[0].x, endPoints[1].x);
            var max = Math.max(endPoints[0].x, endPoints[1].x);
            newValue = Percent(dragX, min, max);
        } else if (endPoints[0].x === endPoints[1].x) {
            var min = Math.min(endPoints[0].y, endPoints[1].y);
            var max = Math.max(endPoints[0].y, endPoints[1].y);
            newValue = Percent(dragY, min, max);
        } else {
            var gameObject = this.gameObject;
            var dist;
            P1.x = dragX;
            P1.y = dragY;

            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, -this.axisRotation, dist);
            P1.y = gameObject.y;
            dist = DistanceBetween(P1.x, P1.y, gameObject.x, gameObject.y);
            P1 = RotateAroundDistance(P1, gameObject.x, gameObject.y, this.axisRotation, dist);

            var min = Math.min(endPoints[0].x, endPoints[1].x);
            var max = Math.max(endPoints[0].x, endPoints[1].x);
            newValue = Percent(P1.x, min, max);
        }

        this.value = newValue;
    }

    updatePos() {
        var gameObject = this.gameObject;
        var points = this.endPoints;
        gameObject.x = Linear(points[0].x, points[1].x, this._value);
        gameObject.y = Linear(points[0].y, points[1].y, this._value);
        return this;
    }
}

var P1 = {}; // reuse this point object

Object.assign(
    Slider.prototype,
    EventEmitterMethods
);

export default Slider;