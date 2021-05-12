import TickTask from '../../utils/ticktask/TickTask.js';
import GetSceneObject from '../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const Lerp = Phaser.Math.Linear;
const AngleBetween = Phaser.Math.Angle.Between;


class MoveTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
        this.setRotateToTarget(GetValue(o, 'rotateToTarget', false));
        this.targetX = GetValue(o, 'targetX', 0);
        this.targetY = GetValue(o, 'targetY', 0);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            speed: this.speed,
            rotateToTarget: this.rotateToTarget,
            targetX: this.targetX,
            targetY: this.targetY,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        this.scene = undefined;
    }

    startTicking() {
        super.startTicking();
        this.scene.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this.update, this);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setRotateToTarget(rotateToTarget) {
        this.rotateToTarget = rotateToTarget;
        return this;
    }

    moveTo(x, y) {
        if (typeof (x) !== 'number') {
            var config = x;
            x = GetValue(config, 'x', undefined);
            y = GetValue(config, 'y', undefined);
        }

        // invalid position
        if ((x == null) || (y == null)) {
            return this;
        }

        this.targetX = x;
        this.targetY = y;
        super.start();
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var gameObject = this.gameObject;
        var curX = gameObject.x,
            curY = gameObject.y;
        var targetX = this.targetX,
            targetY = this.targetY;
        if ((curX === targetX) && (curY === targetY)) {
            this.complete();
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var dt = (delta * this.timeScale) / 1000;
        var movingDist = this.speed * dt;
        var distToTarget = DistanceBetween(curX, curY, targetX, targetY);
        var newX, newY;
        if (movingDist < distToTarget) {
            var t = movingDist / distToTarget;
            newX = Lerp(curX, targetX, t);
            newY = Lerp(curY, targetY, t);
        } else {
            newX = targetX;
            newY = targetY;
        }

        gameObject.setPosition(newX, newY);
        if (this.rotateToTarget) {
            gameObject.rotation = AngleBetween(curX, curY, newX, newY);
        }
        return this;
    }
}

export default MoveTo;