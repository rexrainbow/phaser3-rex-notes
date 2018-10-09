import MoveToTask from 'rexPlugins/behaviors/moveto/MoveTo.js';
import TickTask from 'rexPlugins/utils/ticktask/TickTask.js';

import CanMoveToTile from './CanMoveToTile.js';
import MoveToTile from './MoveToTile.js';
import MoveToward from './MoveToward.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class MoveTo extends TickTask {
    constructor(miniBoard, config) {
        super(miniBoard, config);

        this.miniBoard = miniBoard;
        this.scene = miniBoard.scene;
        this.moveToTask = new MoveToTask(miniBoard, moveToTaskConfig);

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
        this.setMoveableTestCallback(GetValue(o, 'moveableTest', undefined), GetValue(o, 'moveableTestScope', undefined));
        this.destinationTileX = GetValue(o, 'destinationTileX', null);
        this.destinationTileY = GetValue(o, 'destinationTileY', null);
        this.destinationDirection = GetValue(o, 'destinationDirection', null);
        this.lastMoveResult = GetValue(o, 'lastMoveResult', undefined);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            speed: this.speed,
            moveableTest: this.moveableTestCallback,
            moveableTestScope: this.moveableTestScope,
            rotateToTarget: this.rotateToTarget,
            destinationTileX: this.destinationTileX,
            destinationTileY: this.destinationTileY,
            destinationDirection: this.destinationDirection,
            lastMoveResult: this.lastMoveResult,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();
        if (this.miniBoard.on) { // oops, bob object does not have event emitter
            this.miniBoard.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.moveToTask.shutdown();
        super.shutdown();
        this.miniBoard = undefined;
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

    set enable(value) {
        this.moveToTask.setEnable(value);
    }

    get enable() {
        return this.moveToTask.enable;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    get timeScale() {
        return this.moveToTask.timeScale;
    }

    set timeScale(value) {
        this.moveToTask.timeScale = value;
    }

    set speed(value) {
        this.moveToTask.setSpeed(value);
    }

    get speed() {
        return this.moveToTask.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    set rotateToTarget(value) {
        this.moveToTask.setRotateToTarget(value);
    }

    get rotateToTarget() {
        return this.moveToTask.rotateToTarget;
    }

    setRotateToTarget(rotateToTarget) {
        this.rotateToTarget = rotateToTarget;
        return this;
    }

    setBlockerTest(value) {
        if (value === undefined) {
            value = true;
        }
        this.blockerTest = value;
        return this;
    }

    setEdgeBlockerTest(value) {
        if (value === undefined) {
            value = true;
        }
        this.edgeBlockerTest = value;
        return this;
    }

    setMoveableTestCallback(callback, scope) {
        this.moveableTestCallback = callback;
        this.moveableTestScope = scope;
        return this;
    }

    stop() {
        this.isRunning = false;
    }

    /** @private */
    moveAlongLine(startX, startY, endX, endY) {
        if (startX !== undefined) {
            this.miniBoard.x = startX;
        }
        if (startY !== undefined) {
            this.miniBoard.y = startY;
        }
        this.moveToTask.moveTo(endX, endY);
        return this;
    };

    /** @private */
    addMoveLine(startX, startY, endX, endY) {
        if (!this.moveToTask.hasOwnProperty('nextlines')) {
            this.moveToTask.nextlines = [];
        }
        this.moveToTask.nextlines.push(
            [startX, startY, endX, endY]
        );
        return this;
    };

    /** @private */
    moveNextLine() {
        var nextlines = this.moveToTask.nextlines;
        if (!nextlines) {
            return false;
        }
        if (nextlines.length === 0) {
            return false;
        }
        // has next line
        this.moveAlongLine.apply(this, nextlines[0]);
        nextlines.length = 0;
        return true;
    }

    /** @private */
    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
            if (!this.moveNextLine()) {
                this.complete();
            }
            return this;
        }
        return this;
    }
}

const moveToTaskConfig = {
    tickingMode: 0
};

var methods = {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor,
    moveAway: MoveAway,
    moveCloser: MoveCloser,
};
Object.assign(
    MoveTo.prototype,
    methods
);


export default MoveTo;