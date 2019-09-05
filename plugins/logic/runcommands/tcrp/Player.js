import TickTask from '../../../utils/ticktask/TickTask.js';
import GetSceneObject from '../../../utils/system/GetSceneObject.js';
import GetValue from '../../../utils/object/GetValue.js';
import ArrayCopy from '../../../utils/array/Copy.js';
import RunCommands from '../../../runcommands.js';
import GetEventEmitter from '../../../utils/system/GetEventEmitter.js';
import IsArray from '../../../utils/object/IsArray.js';

class Player extends TickTask {
    constructor(parent, config) {
        super(parent, config);

        this.parent = parent;
        this.scene = GetSceneObject(parent);
        this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.state = GetValue(o, 'state', 0); // 0=idle, 1=run, 2=completed
        this.commands = GetValue(o, 'commands', []); // [[dt, cmds], [dt, cmds], ...]
        this.scope = GetValue(o, 'scope', undefined);
        this.setTimeUnit(GetValue(o, 'timeUnit', 0));
        this.setDtMode(GetValue(o, 'dtMode', 0));
        this.setTimeScale(GetValue(o, 'timeScale', 1));
        this.index = GetValue(o, 'index', 0);
        this.nextDt = GetValue(o, 'nextDt', 0);
        this.seek(GetValue(o, 'now', 0));
        this.timeScale = GetValue(o, 'timeScale', 1);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            state: this.state,
            commands: this.commands,
            scope: this.scope,
            timeUnit: this.timeUnit,
            dtMode: this.dtMode,
            index: this.index,
            nextDt: this.nextDt,
            now: this.now,
            timeScale: this.timeScale,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();

        var parentEE = GetEventEmitter(this.parent);
        if (parentEE) {
            parentEE.once('destroy', this.destroy, this);
        }
    }

    shutdown() {
        super.shutdown();

        this.parent = undefined;
        this.scene = undefined;
        this.commands = undefined;
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
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this.update, this);
        }
    }

    load(commands, scope, config) {
        this.stop();
        var timeUnit = GetValue(config, 'timeUnit', undefined);
        if (timeUnit !== undefined) {
            this.setTimeUnit(timeUnit)
        }
        var dtMode = GetValue(config, 'dtMode', undefined);
        if (dtMode !== undefined) {
            this.setDtMode(dtMode);
        }
        commands = commands
            .filter(function (item) {
                var dt = item[0];
                return !isNaN(dt);
            })
            .map(function (item) {
                var dt = item[0];
                if (typeof (dt) === 'string') {
                    item[0] = parseFloat(item[0]);
                }
                return item;
            });

        if (this.dtMode === 0) {
            commands.sort(function (itemA, itemB) {
                var dtA = itemA[0],
                    dtB = itemB[0];
                return (dtA > dtB) ? 1 :
                    (dtA < dtB) ? -1 : 0;
            });
        }

        this.commands = commands;
        this.scope = scope;
        return this;
    }

    start(startAt) {
        if (startAt === undefined) {
            startAt = 0;
        }

        this.stop();
        this.index = 0;
        this.isRunning = true;
        this.state = 1;
        this.nextDt = this.getNextDt(0);
        this.seek(startAt);
        this.update();
        return this;
    }

    pause() {
        this.isRunning = false;
        return this;
    }

    resume() {
        this.isRunning = true;
        return this;
    }

    stop() {
        this.isRunning = false;
        this.state = 0;
        return this;
    }

    seek(time) {
        this.now = time;
        return this;
    }

    get isPlaying() {
        return this.isRunning;
    }

    get completed() {
        return (this.state === 2);
    }

    setTimeScale(value) {
        this.timeScale = value;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        if (time !== undefined) {
            if ((this.timeScale === 0) || (delta === 0)) {
                return this;
            }

            this.now += (delta * this.timeScale);
        }

        if (this.nextDt > this.now) {
            return this;
        }
        while (1) {
            // run a row
            var item = this.commands[this.index];
            var command = item[1];
            if (!IsArray(command)) { // [dt, fnName, param0, param1, ...]
                command = ArrayCopy(CMD, item, 1);
            }
            RunCommands(command, this.scope);
            this.emit('runcommand', command, this.scope);
            // run a row

            if (this.index === (this.commands.length - 1)) {
                this.complete();
                return this;
            } else {
                // next dt
                this.index++; // point to next item
                this.nextDt = this.getNextDt(this.nextDt);
                if (this.nextDt > this.now) {
                    return this;
                }
                // next dt
            }

        }
    }

    complete() {
        super.complete();
        this.state = 2;
    }

    getNextDt(currentDt) {
        var dt = this.commands[this.index][0];
        if (this.timeUnit === 1) { // sec mode
            dt = dt * 1000;
        }

        if (this.dtMode === 1) {
            dt += currentDt;
        }

        return dt;
    }

    setDtMode(dtMode) {
        if (typeof (dtMode) === 'string') {
            dtMode = DTMODE[dtMode];
        }
        this.dtMode = dtMode;
        return this;
    }

    setTimeUnit(timeUnit) {
        if (typeof (timeUnit) === 'string') {
            timeUnit = TIMEUNITMODE[timeUnit];
        }
        this.timeUnit = timeUnit;
        return this;
    }
}

var CMD = []; // reuse this array

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
};

const DTMODE = {
    abs: 0,
    absolute: 0,
    inc: 1,
    increment: 1
};

export default Player;