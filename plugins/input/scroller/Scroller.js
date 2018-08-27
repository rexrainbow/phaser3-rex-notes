'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';
import State from './State.js';
import TouchState from 'rexPlugins/touchstate.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

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

        var touchStateConfig = {
            inputConfig: GetValue(config, 'inputConfig', undefined),
            enable: enable,
            speedTrace: true
        };
        this.touchState = new TouchState(gameObject, touchStateConfig);
        this.touchState
            .on('touchstart', this._state.next, this._state)
            .on('touchend', this._state.next, this._state)
            .on('touchmove', this.onDragMove, this);

        this._value = undefined;
        this.tweenTask = undefined;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setAxisMode(GetValue(o, 'axis', 2));
        this.setSlowDownDeceleration(GetValue(o, 'slowDownDeceleration', 50000));
        this.setBackSpeed(GetValue(o, 'backSpeed', 2000));

        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds) {
            this.setBounds(bounds);
        } else {
            this.setBounds(GetValue(o, 'max', undefined), GetValue(o, 'min', undefined));
        }
        this.setValue(GetValue(o, 'value', this.minValue || 0));
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
        this._state.destroy();
        this.touchState.destroy();
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

    setSlowDownDeceleration(dec) {
        this.slowDownDec = dec;
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
            this.emit('minmax', value);
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
        this.touchState.setEnable(e);
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
        this.value += this.dragVect;
    }

    get slowDownEnable() {
        return !!this.slowDownDec;
    }

    get backEnable() {
        return (!!this.backSpeed);
    }

    get isDragging() {
        return this.touchState.isInTouched;
    }

    overMax(value) {
        return (this.minValue != null) && (value < this.minValue);
    }

    overMin(value) {
        return (this.maxValue != null) && (value > this.maxValue);
    }

    get outOfMinBound() {
        return this.overMax(this.value);
    }

    get outOfMaxBound() {
        return this.overMin(this.value);
    }


    get dragVect() {
        if (this.axisMode === 2) { // y
            return this.touchState.dy;
        } else if (this.axisMode === 1) { // x
            return this.touchState.dx;
        } else {
            return 0;
        }
    }

    get outOfBounds() {
        return this.outOfMinBound || this.outOfMaxBound;
    }

    get isSlipping() {
        var tweenTask = this.tweenTask;
        return tweenTask && tweenTask.isPlaying();
    }

    // action of fsm
    slowDown() {
        this.stop();

        var speed = this.touchState.speed;
        if (speed === 0) {
            this._state.next();
            return;
        }

        var period = speed / this.slowDownDec;
        var d = (speed * speed) / (2 * this.slowDownDec);
        var target;
        if (this.dragVect > 0) {
            target = this.value + d
        } else {
            target = this.value - d;
        }

        var self = this;
        this.tweenTask = this.scene.tweens.add({
            targets: this,
            value: target,
            ease: 'Quad.easeOut',
            duration: period * 1000,
            onUpdate: function () {
                if (self.outOfMinBound) {
                    self.value = self.minValue;
                    self._state.next();
                } else if (self.outOfMaxBound) {
                    self.value = self.maxValue;
                    self._state.next()
                }
            },
            onComplete: this._state.next,
            onCompleteScope: this._state
        });
    }

    pullBack() {
        this.stop();

        var target = (this.outOfMinBound) ? this.minValue : this.maxValue;
        var period = Math.abs(this.value - target) / this.backSpeed;

        this.tweenTask = this.scene.tweens.add({
            targets: this,
            value: target,
            ease: 'Linear',
            duration: period * 1000,
            onComplete: this._state.next,
            onCompleteScope: this._state
        });
    }

    stop() {
        if (this.tweenTask) {
            this.tweenTask.stop();
            this.tweenTask = undefined;
        }
    }

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