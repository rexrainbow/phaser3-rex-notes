import TickTask from '../../utils/componentbase/SceneUpdateTickTask';
import Methods from './methods/Methods';
import MoveToTask from './methods/movetotask/MoveToTask';
import MoveNextLine from './methods/movetotask/MoveNextLine';
import GetChessData from '../chess/GetChessData';
import GetValue from '../../utils/object/GetValue';

class MoveTo extends TickTask {
    boot: any;
    chessData: any;
    complete: any;
    moveableTestCallback: any;
    moveToTask: any;
    parent: any;
    scene: any;
    sneakMode: any;
    tileZSave: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.chessData = GetChessData(gameObject);
        this.scene = gameObject.scene;
        this.moveToTask = new MoveToTask(gameObject, { tickingMode: 0 });

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
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

    shutdown(fromScene?: any) {
        this.moveToTask.shutdown(fromScene);
        super.shutdown(fromScene);
    }

    set enable(value) {
        this.moveToTask.setEnable(value);
    }

    get enable() {
        return this.moveToTask.enable;
    }

    setEnable(e?: any) {
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

    setSpeed(speed?: any) {
        this.speed = speed;
        return this;
    }

    set rotateToTarget(value) {
        this.moveToTask.setRotateToTarget(value);
    }

    get rotateToTarget() {
        return this.moveToTask.rotateToTarget;
    }

    setRotateToTarget(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.rotateToTarget = enable;
        return this;
    }

    setOccupiedTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
    }

    setMoveableTestCallback(callback?: any, scope?: any) {
        this.moveableTestCallback = callback;
        this.moveableTestScope = scope;
        return this;
    }

    setSneakEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        this.sneakMode = enable;
        this.tileZSave = undefined;
        return this;
    }

    update(time?: any, delta?: any) {
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