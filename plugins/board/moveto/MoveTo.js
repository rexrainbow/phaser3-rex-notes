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
        this.setBlockerTest(GetValue(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue(o, 'edgeBlockerTest', false));
        this.setMoveableTestCallback(GetValue(o, 'moveableTest', undefined), GetValue(o, 'moveableTestScope', undefined));
        this.destinationTileX = GetValue(o, 'destinationTileX', null);
        this.destinationTileY = GetValue(o, 'destinationTileY', null);
        this.destinationDirection = GetValue(o, 'destinationDirection', null);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            enable: this.enable,
            timeScale: this.timeScale,
            speed: this.speed,
            blockerTest: this.blockerTest,
            edgeBlockerTest: this.edgeBlockerTest,
            moveableTest: this.moveableTestCallback,
            moveableTestScope: this.moveableTestScope,
            rotateToTarget: this.rotateToTarget,
            destinationTileX: this.destinationTileX,
            destinationTileY: this.destinationTileY,
            destinationDirection: this.destinationDirection,
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

    canMoveTo(tileX, tileY, direction) {
        var board = this.chessData.board;
        // chess is not in a board
        if (board == null) {
            return false;
        }
        var myTileXYZ = this.chessData.tileXYZ;
        var myTileX = myTileXYZ.x,
            myTileY = myTileXYZ.y;
        // move to current position
        if ((tileX === myTileX) && (tileY === myTileY)) {
            return true;
        }
        // target position is not in board
        if (!board.contains(tileX, tileY)) {
            return false;
        }

        if (direction === undefined) {
            direction = this.getTileDirection(tileX, tileY);
        }

        // blocker test
        if (this.blockerTest) {
            if (board.hasBlocker(tileX, tileY)) {
                return false;
            }
        }

        // edge-blocker test
        if (this.edgeBlockerTest) {
            var chess = this.TileXYToChessArray(myTileX, myTileY, tmpChessArray);
            if (chess.length > 1) {
                for (var i = 0, cnt = chess.length; i < cnt; i++) {
                    if (chess[i] === this.gameObject) {
                        continue;
                    }
                    if (board.hasEdgeBlocker(myTileX, myTileY, this.chessToTileXYZ(chess[i]).z, direction)) {
                        tmpChessArray.length = 0;
                        return false;
                    }
                }
            }
            tmpChessArray.length = 0;

            // TODO
        }

        // custom moveable test
        if (this.moveableTestCallback) {
            tmpTileXYZ.x = tileX;
            tmpTileXYZ.y = tileY;
            tmpTileXYZ.direction = direction;
            if (this.moveableTestScope) {
                var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, tmpTileXYZ, board);
            } else {
                var moveable = this.moveableTestCallback(myTileXYZ, tmpTileXYZ, board);
            }
            if (!moveable) {
                return false;
            }
        }

        return true;
    }

    moveTo(tileX, tileY, direction, speed) {
        var board = this.chessData.board;
        if (board === null) { // chess is not in a board
            return this;
        }

        this.stop();
        if (IsPlainObject(tileX)) {
            var config = tileX;
            tileX = GetValue(config, 'x', undefined);
            tileY = GetValue(config, 'y', undefined);
            direction = GetValue(config, 'direction', undefined);
            speed = GetValue(config, 'speed', undefined);
        }

        if ((tileX == null) || (tileY == null)) {
            this.setDestination(null, null, null);
            return this;
        }
        if (speed !== undefined) {
            this.speed = speed;
        }

        if (direction === undefined) {
            direction = this.getTileDirection(tileX, tileY);
        }
        this.setDestination(tileX, tileY, direction);
        if (!this.canMoveTo(tileX, tileY, direction)) {
            return this;
        }
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
        this.moveTo(targetTileXY.x, targetTileXY.y, direction);
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

    setDestination(tileX, tileY, direction) {
        this.destinationTileX = tileX;
        this.destinationTileY = tileY;
        this.destinationDirection = direction;
        return this;
    }

    getTileDirection(tileX, tileY) {
        var board = this.chessData.board;
        tmpTileXYZ.x = tileX;
        tmpTileXYZ.y = tileY;
        return board.getNeighborTileDirection(this.chessData.tileXYZ, tmpTileXYZ);
    }
}

var tmpTileXYZ = {
    x: 0,
    y: 0,
    direction: null
};

var tmpChessArray = [];

const moveToTaskConfig = {
    tickingMode: 0
};

export default MoveTo;