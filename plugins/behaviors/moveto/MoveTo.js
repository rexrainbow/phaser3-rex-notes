import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const Lerp = Phaser.Math.Linear;
const AngleBetween = Phaser.Math.Angle.Between;
const arriveEpsilon = 0.0001;

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
            targets: this.targets
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
            super.start();
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
        super.complete();
        this.isCompleted = true;
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        if (this.targetX == null || this.targetY == null) {
            this.stop();
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var deltaSeconds = (delta * this.timeScale) / 1000;
        var remainingDistanceBudget = this.speed * deltaSeconds;

        // Consume remainingDistanceBudget across multiple targets in the same tick
        while (remainingDistanceBudget > 0) {
            var currentX = gameObject.x;
            var currentY = gameObject.y;

            var targetX = this.targetX;
            var targetY = this.targetY;

            var distanceToTarget = DistanceBetween(currentX, currentY, targetX, targetY);

            // If already on the current target, switch to next target or complete
            if (distanceToTarget <= arriveEpsilon) {
                if (this.targets.length > 0) {
                    var nextTarget = this.targets.shift();
                    this.targetX = nextTarget.x;
                    this.targetY = nextTarget.y;
                    continue;
                }

                this.complete();
                return this;
            }

            // Move partially toward target
            else if (remainingDistanceBudget < distanceToTarget) {
                var t = remainingDistanceBudget / distanceToTarget;
                var newX = Lerp(currentX, targetX, t);
                var newY = Lerp(currentY, targetY, t);

                gameObject.setPosition(newX, newY);

                if (this.rotateToTarget) {
                    gameObject.rotation = AngleBetween(currentX, currentY, newX, newY);
                }

                remainingDistanceBudget = 0;
                break;
            }

            // Reach target and still have remaining distance budget
            gameObject.setPosition(targetX, targetY);

            if (this.rotateToTarget) {
                gameObject.rotation = AngleBetween(currentX, currentY, targetX, targetY);
            }

            remainingDistanceBudget -= distanceToTarget;

            // Continue to next target if any, otherwise complete
            if (this.targets.length > 0) {
                var nextTargetAfterReach = this.targets.shift();
                this.targetX = nextTargetAfterReach.x;
                this.targetY = nextTargetAfterReach.y;
                continue;
            }

            this.complete();
            return this;
        }

        return this;
    }
}

export default MoveTo;