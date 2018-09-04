'use strict'

import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const MathWrap = Phaser.Math.Wrap;
const WrapAngle = Phaser.Math.Angle.Wrap;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const AngleBetween = Phaser.Math.Angle.Between;


class RotateTo extends EE {
    constructor(gameObject, config) {
        super();

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isMoving = GetValue(o, 'isMoving', false);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 180));
        this.target = GetValue(o, 'target', 0);
        this.dir = GetValue(o, 'dir', 0);
        this.tickMe = GetValue(o, 'tickMe', true); // true to enable 'update' callback
        return this;
    }

    toJSON() {
        return {
            isMoving: this.isMoving,
            timeScale: this.timeScale,
            speed: this.speed,
            target: this.target,
            dir: this.dir,
            tickMe: this.tickMe
        };
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }

        if (this.tickMe) {
            this.scene.events.on('update', this.update, this);
        }
    }

    shutdown() {
        super.shutdown();
        if (this.tickMe) {
            this.scene.events.off('update', this.update, this);
        }
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    rotateTo(angle, dir, speed) {
        this.stop();

        if (IsPlainObject(angle)) {
            var config = angle;
            angle = GetValue(config, 'angle', undefined);
            dir = GetValue(config, 'dir', undefined);
            speed = GetValue(config, 'speed', undefined);
        }
        this.target = MathWrap(angle, 0, 360); // 0~360
        if (dir === undefined) {
            dir = 0;
        }
        this.dir = (typeof (dir) === 'string') ? DIRMODE[dir] : dir;
        if (angle == null) {
            return this;
        }
        if (speed !== undefined) {
            this.speed = speed;
        }

        this.isMoving = true;
        return this;
    }

    rotateTowardsPosition(x, y, dir, speed) {
        var gameObject = this.gameObject;
        var rad = AngleBetween(gameObject.x, gameObject.y, x, y);
        var angle = RadToDeg(rad);
        this.rotateTo(angle, dir, speed);
        return this;
    }

    stop() {
        this.isMoving = false;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    update(time, delta) {
        if (!this.isMoving) {
            return;
        }

        var target = this.target; // 0~360
        var targetRad = WrapAngle(DegToRad(target)); // -PI~PI
        var gameObject = this.gameObject;
        if (targetRad === gameObject.rotation) {
            this.onReachTarget();
            return;  
        }

        if ((this.speed === 0) || (delta === 0)) {
            return;
        }

        var curAngle = (360 + gameObject.angle) % 360; // 0~360
        var dt = (delta * this.timeScale) / 1000;
        var movingDist = this.speed * dt;
        var distToTarget, dir = this.dir;
        switch (dir) {
            case 0: // shotest
                var distCW = diffAngle(curAngle, target, true);
                var distCCW = 360 - distCW;
                if (distCW < distCCW) {
                    dir = 1;
                    distToTarget = distCW;
                } else {
                    dir = 2;
                    distToTarget = distCCW;
                }
                break;
            case 1: // cw
                distToTarget = diffAngle(curAngle, target, true);
                break;
            case 2: // ccw
                distToTarget = diffAngle(curAngle, target, false);
                break;
        }

        var newAngle;
        if (movingDist < distToTarget) {
            newAngle = (dir === 1) ? (curAngle + movingDist) : (curAngle - movingDist);
        } else {
            newAngle = target;
        }

        gameObject.rotation = DegToRad(newAngle);
    }

    onReachTarget() {
        this.isMoving = false;
        this.emit('complete', this, this.gameObject);
    }
}

var diffAngle = function (a0, a1, cw) {
    var diff = (cw) ? (a1 - a0) : (a0 - a1);
    diff = MathWrap(diff, 0, 360);
    return diff;
}

const DIRMODE = {
    shortest: 0,
    cw: 1,
    ccw: 2
}
export default RotateTo;