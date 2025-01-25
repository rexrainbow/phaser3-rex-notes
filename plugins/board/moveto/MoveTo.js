import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import Methods from './methods/Methods.js';
import MoveToTask from './methods/movetotask/MoveToTask.js';
import MoveNextLine from './methods/movetotask/MoveNextLine.js';
import GetChessData from '../chess/GetChessData.js';
import GetValue from '../../utils/object/GetValue.js';

class MoveTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.chessData = GetChessData(gameObject);
        this.scene = gameObject.scene;
        this.moveToTask = new MoveToTask(gameObject, { tickingMode: 0 });

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
        this.setRotateToTarget(GetValue(o, 'rotateToTarget', false));
        this.setOccupiedTest(GetValue(o, 'occupiedTest', false));
        this.setBlockerTest(GetValue(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue(o, 'edgeBlockerTest', false));
        this.setMoveableTestCallback(GetValue(o, 'moveableTest', undefined), GetValue(o, 'moveableTestScope', undefined));
        this.setSneakEnable(GetValue(o, 'sneak', false));
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
            occupiedTest: this.occupiedTest,
            blockerTest: this.blockerTest,
            edgeBlockerTest: this.edgeBlockerTest,
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

    shutdown(fromScene) {
        this.moveToTask.shutdown(fromScene);
        super.shutdown(fromScene);
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

    setRotateToTarget(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.rotateToTarget = enable;
        return this;
    }

    setOccupiedTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
    }

    setMoveableTestCallback(callback, scope) {
        this.moveableTestCallback = callback;
        this.moveableTestScope = scope;
        return this;
    }

    setSneakEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.sneakMode = enable;
        this.tileZSave = undefined;
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var moveToTask = this.moveToTask;
        moveToTask.update(time, delta);
        if (!moveToTask.isRunning) {
            if (!MoveNextLine.call(this)) {
                this.complete();
            }
            return this;
        }
        return this;
    }
}

Object.assign(
    MoveTo.prototype,
    Methods
);


export default MoveTo;