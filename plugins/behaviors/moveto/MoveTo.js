'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class MoveTo extends EE {
    constructor(gameObject, config) {
        super();

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.tween = undefined;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.isMoving = GetValue(o, 'isMoving', false);
        this._speed = GetValue(o, 'speed', 0);
        this.targetX = GetValue(o, 'target.x', undefined);
        this.targetY = GetValue(o, 'target.y', undefined);
        if ((this.targetX !== undefined) && (this.targetY !== undefined)) {
            this.moveTo(this.targetX, this.targetY);
        }
        return this;
    }

    toJSON() {
        return {
            isMoving: this.isMoving,
            speed: this.speed,
            targetX: this.targetX,
            targetY: this.targetY
        };
    }

    moveTo(x, y, config) {
        this.stop();

        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', undefined);
            y = GetValue(config, 'y', undefined);
        }
        if ((x == null) || (y == null)) {
            return this;
        }

        var speed = GetValue(config, 'speed', undefined);
        if (speed !== undefined) {
            this.setSpeed(speed);
        }

        this.isMoving = true;
        this.targetX = x;
        this.targetY = y;
        if (this.speed === 0) {
            return this;
        }
        var gameObject = this.gameObject;
        var d = DistanceBetween(gameObject.x, gameObject.y, x, y);
        var duration = d / this.speed;
        this.tween = this.scene.tweens.add({
            targets: gameObject,
            x: x,
            y: y,
            ease: 'Linear',
            duration: (duration) * 1000,
            repeat: 0,
            yoyo: false,
            onComplete: this.onReachTarget,
            onCompleteScope: this
        });
        return this;
    }

    stop() {
        this.isMoving = false;
        if (this.tween) {
            this.tween.stop();
            this.tween = undefined;
        }
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed;
        if (this.isMoving) {
            this.moveTo(this.targetX, this.targetY);
        }
    }

    onReachTarget() {
        this.isMoving = false;
        this.emit('complete', this);
    }
}

export default MoveTo;