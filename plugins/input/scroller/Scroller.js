import GetSceneObject from '../../utils/system/GetSceneObject.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import State from './State.js';
import DrapSpeed from '../../dragspeed.js';
import SlowDown from '../../utils/movement/SlowDown.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scroller {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        var enable = GetValue(config, 'enable', true);
        var stateConfig = {
            enable: enable,
            eventEmitter: false,
        }
        this._state = new State(this, stateConfig);

        var drapSpeedConfig = {
            inputConfig: GetValue(config, 'inputConfig', undefined),
            enable: enable,
            eventEmitter: false,
        };
        this.dragState = new DrapSpeed(gameObject, drapSpeedConfig);

        this._enable = undefined;
        this._value = undefined;
        this._slowDown = new SlowDown();

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }
        callback = GetValue(config, 'overmaxCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'overmaxCallbackScope', undefined);
            this.on('overmax', callback, scope);
        }
        callback = GetValue(config, 'overminCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'overminCallbackScope', undefined);
            this.on('overmin', callback, scope);
        }

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setOrientationMode(GetValue(o, 'orientation', 0));
        this.setDragThreshold(GetValue(o, 'threshold', 10));
        this.setSlidingDeceleration(GetValue(o, 'slidingDeceleration', 5000));
        this.setBackDeceleration(GetValue(o, 'backDeceleration', 2000));

        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds) {
            this.setBounds(bounds);
        } else {
            this.setBounds(GetValue(o, 'max', 0), GetValue(o, 'min', 0));
        }
        this.setValue(GetValue(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        this.scene.events.on('update', this._state.update, this._state);
        this.gameObject.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.destroyEventEmitter();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this._state.update, this._state);
        }
        this.gameObject = undefined;
        this.scene = undefined;
        this._state.destroy();
        this.dragState.destroy();
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        this._enable = e;
        this._state.setEnable(e);
        this.dragState.setEnable(e);
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setOrientationMode(m) {
        if (typeof (m) === 'string') {
            m = ORIENTATIONMODE[m];
        }
        this.orientationMode = m;
        return this;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setSlidingDeceleration(dec) {
        this.slidingDeceleration = dec;
        return this;
    }

    setBackDeceleration(dec) {
        this.backDeceleration = dec;
        return this;
    }

    setBounds(value0, value1) {
        if (Array.isArray(value0)) {
            var bounds = value0;
            value0 = bounds[0];
            value1 = bounds[1];
        }
        if (value0 < value1) {
            this.minValue = value0;
            this.maxValue = value1;
        } else {
            this.minValue = value1;
            this.maxValue = value0;
        }
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (value === this._value) {
            return;
        }

        var oldValue = this._value;
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);
        if (isOverMax) {
            this.emit('overmax', value, oldValue);
        }
        if (isOverMin) {
            this.emit('overmin', value, oldValue);
        }
        if (!this.backEnable) {
            if (isOverMax) {
                value = this.maxValue;
            }
            if (isOverMin) {
                value = this.minValue;
            }
        }

        this._value = value;
        this.emit('valuechange', value, oldValue);
    }

    setValue(value) {
        this.value = value;
    }

    get state() {
        return this._state.state;
    }

    get isDragging() {
        return this.dragState.isInTouched;
    }

    get outOfMaxBound() {
        return this.overMax(this.value);
    }

    get outOfMinBound() {
        return this.overMin(this.value);
    }

    get outOfBounds() {
        return this.outOfMinBound || this.outOfMaxBound;
    }

    // internal
    overMax(value) {
        return (this.maxValue != null) && (value > this.maxValue);
    }

    overMin(value) {
        return (this.minValue != null) && (value < this.minValue);
    }

    get backEnable() {
        return (typeof (this.backDeceleration) === 'number');
    }

    get isPullBack() {
        return this._slowDown.isMoving;
    }

    get slidingEnable() {
        return (typeof (this.slidingDeceleration) === 'number');
    }

    get isSliding() {
        return this._slowDown.isMoving;
    }

    get dragDelta() {
        if (this.orientationMode === 0) { // y
            return this.dragState.dy;
        } else if (this.orientationMode === 1) { // x
            return this.dragState.dx;
        } else {
            return 0;
        }
    }

    get dragSpeed() {
        if (this.orientationMode === 0) { // y
            return this.dragState.speedY;
        } else if (this.orientationMode === 1) { // x
            return this.dragState.speedX;
        } else {
            return 0;
        }
    }

    // everyTick_DRAG
    dragging() {
        this.value += this.dragDelta;
    }

    // enter_SLIDE 
    onSliding() {
        var start = this.value;
        var speed = this.dragSpeed;
        if (speed === 0) {
            this._slowDown.stop();
            this._state.next();
            return;
        }
        var dec = this.slidingDeceleration;
        this._slowDown.init(start, (speed > 0), Math.abs(speed), dec)
    }

    // everyTick_SLIDE
    sliding(time, delta) {
        delta *= 0.001;
        var newValue = this._slowDown.update(delta).value;
        if (this.overMax(newValue)) {
            this.value = this.maxValue;
            this._slowDown.stop();
        } else if (this.overMin(newValue)) {
            this.value = this.minValue;
            this._slowDown.stop();
        } else {
            this.value = newValue;
        }
    }

    // enter_BACK
    onPullBack() {
        var start = this.value;
        var end = (this.outOfMinBound) ? this.minValue : this.maxValue;
        var dist = Math.abs(end - start);
        var dec = this.backDeceleration;
        var speed = Math.sqrt(2 * dec * dist);
        this._slowDown.init(start, undefined, speed, dec, end);
    }

    // everyTick_BACK
    pullBack(time, delta) {
        delta *= 0.001;
        this.value = this._slowDown.update(delta).value;

        if (!this._slowDown.isMoving) {
            this._state.next();
        }
    }

    // exit_SLIDE, exit_BACK
    stop() {
        this._slowDown.stop();
    }

}

Object.assign(
    Scroller.prototype,
    EventEmitterMethods
);

/** @private */
const ORIENTATIONMODE = {
    y: 0,
    v: 0,
    vertical: 0,
    x: 1,
    h: 1,
    horizontal: 1,
};

export default Scroller;