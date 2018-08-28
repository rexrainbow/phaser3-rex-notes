'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';
import State from './State.js';
import DrapSpeed from 'rexPlugins/dragspeed.js';
import MoveTo from 'rexPlugins/utils/movement/MoveTo.js';
import SlowDown from 'rexPlugins/utils/movement/SlowDown.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Scroller extends EE {
    constructor(gameObject, config) {
        super();
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        var enable = GetValue(config, 'enable', true);
        var stateConfig = {
            enable: enable
        }
        this._state = new State(this, stateConfig);

        var drapSpeedConfig = {
            inputConfig: GetValue(config, 'inputConfig', undefined),
            enable: enable
        };
        this._dragSpeed = new DrapSpeed(gameObject, drapSpeedConfig);

        this._value = undefined;
        this._moveTo = new MoveTo();
        this._slowDown = new SlowDown();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setAxisMode(GetValue(o, 'axis', 2));
        this.setSlidingDeceleration(GetValue(o, 'slidingDeceleration', 5000));
        this.setBackSpeed(GetValue(o, 'backSpeed', 1000));

        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds) {
            this.setBounds(bounds);
        } else {
            this.setBounds(GetValue(o, 'max', undefined), GetValue(o, 'min', undefined));
        }
        this.setValue(GetValue(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        this._dragSpeed
            .on('touchstart', this.onDragStart, this)
            .on('touchend', this.onDragEnd, this)
            .on('touchmove', this.onDragMove, this);

        this.scene.events.on('update', this.update, this);
    }

    shutdown() {
        super.shutdown();
        this.scene.events.off('update', this.update, this);
        this.gameObject = undefined;
        this.scene = undefined;
        this._state.destroy();
        this._dragSpeed.destroy();
        // gameObject events will be removed when this gameObject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = AXISMODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setSlidingDeceleration(dec) {
        this.slidingDec = dec;
        return this;
    }

    setBackSpeed(speed) {
        this.backSpeed = speed;
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
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);
        if (isOverMax) {
            this.emit('overmax', value);
        }
        if (isOverMin) {
            this.emit('overmin', value);
        }
        if (!this.backEnable) {
            if (isOverMax) {
                value = this.maxValue;
            }
            if (isOverMin) {
                value = this.minValue;
            }
        }

        if (value === this._value) {
            return;
        }
        var oldValue = this._value;
        this._value = value;
        this.emit('valuechange', this._value, oldValue);
    }

    setValue(value) {
        this.value = value;
    }

    setEnable(e) {
        this._state.setEnable(e);
        this._dragSpeed.setEnable(e);
        return this;
    }

    get state() {
        return this._state.state;
    }

    onDragStart() {
        this._state.next();
    }

    onDragEnd() {
        this._state.next();
    }

    onDragMove() {
        this.value += this.dragVecter;
    }

    get slidingEnable() {
        return (this.slidingDec != null);
    }

    get backEnable() {
        return (this.backSpeed != null);
    }

    get isDragging() {
        return this._dragSpeed.isInTouched;
    }

    get isPullBack() {
        return this._moveTo.isMoving;
    }

    get isSliding() {
        return this._slowDown.isMoving;
    }

    overMax(value) {
        return (this.maxValue != null) && (value > this.maxValue);
    }

    overMin(value) {
        return (this.minValue != null) && (value < this.minValue);
    }

    get outOfMaxBound() {
        return this.overMax(this.value);
    }

    get outOfMinBound() {
        return this.overMin(this.value);
    }

    get dragVecter() {
        if (this.axisMode === 2) { // y
            return this._dragSpeed.dy;
        } else if (this.axisMode === 1) { // x
            return this._dragSpeed.dx;
        } else {
            return 0;
        }
    }

    get dragSpeed() {
        if (this.axisMode === 2) { // y
            return this._dragSpeed.speedY;
        } else if (this.axisMode === 1) { // x
            return this._dragSpeed.speedX;
        } else {
            return 0;
        }
    }

    get outOfBounds() {
        return this.outOfMinBound || this.outOfMaxBound;
    }


    update(time, delta) {
        if (delta <= 0) {
            return;
        }

        var state = this.state;
        switch (state) {
            case 'SLIDE':
                this.sliding(delta);
                break;
            case 'BACK':
                this.pullBack(delta);
                break;
        }
    }

    onSliding() {
        var speed = this.dragSpeed;
        if (speed === 0) {
            this._slowDown.stop();
            this._state.next();
            return;
        }
        debugger
        this._slowDown.init(this.value, (speed > 0), Math.abs(speed), this.slidingDec)
    }

    sliding(delta) {
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

        if (!this._slowDown.isMoving) {
            this._state.next();
        }
    }

    onPullBack() {
        var target = (this.outOfMinBound) ? this.minValue : this.maxValue;
        this._moveTo.init(this.value, target, this.backSpeed);
    }

    pullBack(delta) {
        delta *= 0.001;
        this.value = this._moveTo.update(delta).value;

        if (!this._moveTo.isMoving) {
            this._state.next();
        }
    }

    stop() {}

}


/** @private */
const AXISMODE = {
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
};

export default Scroller;