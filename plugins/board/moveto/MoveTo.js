import MoveToTask from 'rexPlugins/behaviors/moveto/MoveTo.js';
import TickTask from 'rexPlugins/utils/ticktask/TickTask.js';
import GetChessData from '../chess/GetChessData.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class MoveTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);

        this.gameObject = gameObject;
        this.scene = gameObject.scene;
        this.moveToTask = new MoveToTask(gameObject, moveToTaskConfig);
        this.chessData = GetChessData(gameObject);

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
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.moveToTask.shutdown();
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

    canMoveTo(tileX, tileY) {
        var board = this.chessData.board;
        // chess is not in a board
        if (board == null) {
            return false;
        }
        var myTileXYZ = this.chessData.tileXYZ;
        // move to current position
        if ((tileX === myTileXYZ.x) && (tileY === myTileXYZ.y)) {
            return true;
        }
        // target position is not in board
        if (!board.contains(tileX, tileY)) {
            return false;
        }
        return true;
    }

    moveTo(tileX, tileY, speed) {
        this.stop();

        if (IsPlainObject(tileX)) {
            var config = tileX;
            tileX = GetValue(config, 'x', undefined);
            tileY = GetValue(config, 'y', undefined);
            speed = GetValue(config, 'speed', undefined);
        }
        this.targetX = tileX;
        this.targetY = tileY;
        if ((tileX == null) || (tileY == null)) {
            return this;
        }
        if (speed !== undefined) {
            this.speed = speed;
        }

        if (!this.canMoveTo(tileX, tileY)) {
            return this;
        }
        var board = this.chessData.board;
        var worldX = board.tileXYToWorldX(tileX, tileY);
        var worldY = board.tileXYToWorldY(tileX, tileY);
        board.moveChess(this.gameObject, tileX, tileY);
        this.moveToTask.moveTo(worldX, worldY);

        this.isRunning = true;
        return this;
    }

    moveToDir(direction) {
        var myTileXYZ = this.chessData.tileXYZ;
        if (myTileXYZ == null) { // not in board
            return this;
        }
        var board = this.chessData.board;
        var targetTileXY = board.getNeighborTileXY(myTileXYZ, direction);
        if (targetTileXY === null) {
            return this;
        }
        this.moveTo(targetTileXY.x, targetTileXY.y);
        return this;
    }

    stop() {
        this.isRunning = false;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
            this.complete();
            return this;
        }
        return this;
    }
}

const moveToTaskConfig = {
    tickingMode: 0
};

export default MoveTo;