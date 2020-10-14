import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetSceneObject from '../../../utils/system/GetSceneObject.js';
import Clock from '../../../clock.js';
import ArrayCopy from '../../../utils/array/Copy.js';
import RunCommands from '../../../runcommands.js';
import GetEventEmitter from '../../../utils/system/GetEventEmitter.js';
import IsArray from '../../../utils/object/IsArray.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Player {
    constructor(parent, config) {
        this.parent = parent;
        this.scene = GetSceneObject(parent);
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        var clockClass = GetValue(config, 'clockClass', Clock);
        this.clock = new clockClass(parent, { eventEmitter: this.getEventEmitter() });
        this.clock.on('update', this.update, this);

        this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    resetFromJSON(o) {
        this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
        this.state = GetValue(o, 'state', 0); // 0=idle, 1=run, 2=completed
        this.commands = GetValue(o, 'commands', []); // [[time, cmds], [time, cmds], ...]
        this.scope = GetValue(o, 'scope', undefined);
        this.setTimeUnit(GetValue(o, 'timeUnit', 0));
        this.setDtMode(GetValue(o, 'dtMode', 0));
        this.index = GetValue(o, 'index', 0);
        this.nextTime = GetValue(o, 'nextTime', 0);
        return this;
    }

    toJSON() {
        return {
            clock: this.clock.toJSON(),
            state: this.state,
            commands: this.commands,
            scope: this.scope,
            timeUnit: this.timeUnit,
            dtMode: this.dtMode,
            index: this.index,
            nextTime: this.nextTime
        };
    }

    boot() {
        var parentEE = GetEventEmitter(this.parent);
        if (parentEE) {
            parentEE.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.clock.shutdown();
        this.parent = undefined;
        this.scene = undefined;
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
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
        this.state = 1;
        this.nextTime = this.getNextDt(0);

        this.clock.start(startAt);
        this.update(startAt);
        return this;
    }

    pause() {
        this.clock.pause();
        return this;
    }

    resume() {
        this.clock.resume();
        return this;
    }

    stop() {
        this.clock.stop();
        this.state = 0;
        return this;
    }

    seek(time) {
        this.clock.seek(time);
        return this;
    }

    get isPlaying() {
        return this.clock.isRunning;
    }

    get completed() {
        return (this.state === 2);
    }

    setTimeScale(value) {
        this.clock.timeScale = value;
        return this;
    }

    update(now) {
        if (this.nextTime > now) {
            return this;
        }
        var lastCommandIndex = this.commands.length - 1;
        while (1) {
            // Execute a command
            var item = this.commands[this.index];
            var command = item[1];
            if (!IsArray(command)) { // [dt, fnName, param0, param1, ...]
                command = ArrayCopy(CMD, item, 1);
            }
            RunCommands(command, this.scope);
            this.emit('runcommand', command, this.scope);
            // Execute a command

            if (this.index === lastCommandIndex) {
                this.complete();
                return this;
            } else {
                // Get next time
                this.index++; // Point to next command
                this.nextTime = this.getNextDt(this.nextTime);
                if (this.nextTime > now) {
                    return this;
                }
                // Get next time
            }

        }
    }

    complete() {
        this.clock.complete();
        this.state = 2;
    }

    getNextDt(currentDt) {
        var time = this.commands[this.index][0];
        if (this.timeUnit === 1) { // Second mode
            time = time * 1000;
        }

        if (this.dtMode === 1) {
            time += currentDt;
        }

        return time;
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

Object.assign(
    Player.prototype,
    EventEmitterMethods
);

var CMD = []; // reuse this array

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1,
};

const DTMODE = {
    abs: 0,
    absolute: 0,
    inc: 1,
    increment: 1
};

export default Player;