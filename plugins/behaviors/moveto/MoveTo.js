import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import MoveMethods from './MoveMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class MoveTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isCompleted = GetValue(o, 'isCompleted', true);
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
        this.setRotateToTarget(GetValue(o, 'rotateToTarget', false));
        this.targetX = GetValue(o, 'targetX', null); // Invalid
        this.targetY = GetValue(o, 'targetY', null);
        this.appendMode = GetValue(o, 'appendMode', false);
        this.targets = GetValue(o, 'targets', []); // {x,y}[]
        this.continueAfterComplete = GetValue(o, 'continueAfterComplete', false);

        return this;
    }

    toJSON() {
        return {
            isCompleted: this.isCompleted,
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            speed: this.speed,
            rotateToTarget: this.rotateToTarget,
            targetX: this.targetX,
            targetY: this.targetY,
            tickingMode: this.tickingMode,
            appendMode: this.appendMode,
            targets: this.targets,
            continueAfterComplete: this.continueAfterComplete
        };
    }

    get lastTargetPosition() {
        var queuedLength = this.targets.length;
        if (queuedLength === 0) {
            return { x: this.targetX, y: this.targetY };
        } else {
            var lastTarget = this.targets[queuedLength - 1];
            return { x: lastTarget.x, y: lastTarget.y };
        }
    }

    setEnable(enable) {
        if (enable == undefined) {
            enable = true;
        }
        this.enable = enable;
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

    setAppendMode(appendMode) {
        this.appendMode = !!appendMode;

        if (!this.appendMode) {
            this.clearTargets();
        }
        return this;
    }

    clearTargets() {
        this.targets.length = 0;
        return this;
    }

    moveTo(x, y) {
        if (x === undefined) {
            if (!this.isCompleted) { // Resume
                super.start();
            } else {
                // Does not have target position, do nothing
            }
            return this;
        }

        if (typeof (x) !== 'number') {
            var config = x;
            x = config.x;
            y = config.y;
        }

        var isNewTask = false;
        if (this.appendMode) {
            if (this.isCompleted) { // New task
                this.targetX = x;
                this.targetY = y;
                isNewTask = true;

            } else {
                this.targets.push({ x, y });

            }

        } else {

            this.targetX = x;
            this.targetY = y;
            isNewTask = true;

        }

        if (isNewTask) {
            this.start();
            this.emit('start', this.parent, this);
        }

        return this;
    }

    moveFrom(x, y) {
        // This method will clear queue targets

        if (typeof (x) !== 'number') {
            var config = x;
            x = config.x;
            y = config.y;
        }

        this.stop();

        var gameObject = this.parent;
        var targetX = gameObject.x;
        var targetY = gameObject.y;

        gameObject.setPosition(x, y);

        this.moveTo(targetX, targetY);

        return this;
    }

    moveToward(angle, distance) {
        var referencePosition;

        if (this.appendMode && !this.isCompleted) {
            referencePosition = this.lastTargetPosition;

        } else {
            referencePosition = this.parent;  // gameObject
        }

        var targetX = referencePosition.x + Math.cos(angle) * distance;
        var targetY = referencePosition.y + Math.sin(angle) * distance;
        this.moveTo(targetX, targetY);

        return this;
    }

    start() {
        this.isCompleted = false;
        super.start();
        return this;
    }

    stop() {
        super.stop();
        this.clearTargets();
        this.isCompleted = true;
        return this;
    }

    complete() {
        this.isCompleted = true;
        super.complete();
        return this;
    }
}

Object.assign(
    MoveTo.prototype,
    MoveMethods,
)

export default MoveTo;
