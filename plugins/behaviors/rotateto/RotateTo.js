'use strict'

import TickTask from 'rexPlugins/utils/ticktask/TickTask.js';
import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const MathWrap = Phaser.Math.Wrap;
const WrapAngle = Phaser.Math.Angle.Wrap;
const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;
const AngleBetween = Phaser.Math.Angle.Between;


class RotateTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 180));
        this.target = GetValue(o, 'target', 0);
        this.dir = GetValue(o, 'dir', 0);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            timeScale: this.timeScale,
            speed: this.speed,
            target: this.target,
            dir: this.dir,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        this.scene.events.off('update', this.update, this);
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

        this.isRunning = true;
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
        this.isRunning = false;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        var target = this.target; // 0~360
        var targetRad = WrapAngle(DegToRad(target)); // -PI~PI
        var gameObject = this.gameObject;
        if (targetRad === gameObject.rotation) {
            this.complete();
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
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
        return this;
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