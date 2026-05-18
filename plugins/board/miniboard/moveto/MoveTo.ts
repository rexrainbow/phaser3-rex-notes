import MoveToTask from '../../../behaviors/moveto/MoveTo';
import TickTask from '../../../utils/componentbase/SceneUpdateTickTask';

import CanMoveToTile from './CanMoveToTile';
import MoveToTile from './MoveToTile';
import MoveToward from './MoveToward';
import MoveToRandomNeighbor from './MoveToRandomNeighbor';

import GetValue from '../../../utils/object/GetValue';

class MoveTo extends TickTask {
    boot: any;
    complete: any;
    isShutdown: any;
    moveableTestCallback: any;
    moveToTask: any;
    parent: any;

    constructor(miniBoard?: any, config?: any) {
        super(miniBoard, config);
        // this.parent = miniBoard;

        this.moveToTask = new MoveToTask(miniBoard, { tickingMode: 0 });

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 400));
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
            destinationTileX: this.destinationTileX,
            destinationTileY: this.destinationTileY,
            destinationDirection: this.destinationDirection,
            lastMoveResult: this.lastMoveResult,
            tickingMode: this.tickingMode
        };
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

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

    update(time?: any, delta?: any) {
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

var methods = {
    canMoveTo: CanMoveToTile,
    moveTo: MoveToTile,
    moveToward: MoveToward,
    moveToRandomNeighbor: MoveToRandomNeighbor,
};
Object.assign(
    MoveTo.prototype,
    methods
);


export default MoveTo;