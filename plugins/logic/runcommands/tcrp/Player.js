'use strict'

import Clock from 'rexPlugins/clock.js'
import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';
import ArrayCopy from 'rexPlugins/utils/array/Copy.js';
import RunCommands from 'rexPlugins/runcommands.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Player extends EE {
    constructor(parent, config) {
        super();
        this.parent = parent;
        this.scene = GetSceneObject(parent);
        this.clock = new Clock(parent, {
            tickMe: false
        });
        this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.commands = GetValue(o, 'commands', []); // [[dt, cmds], [dt, cmds], ...]
        this.scope = GetValue(o, 'scope', undefined);
        this.setTimeUnit(GetValue(o, 'timeUnit', 0));
        this.setDtMode(GetValue(o, 'dtMode', 0));
        this.setTimeScale(GetValue(o, 'timeScale', 1));
        this.index = GetValue(o, 'index', 0);
        this.state = GetValue(o, 'state', 0); // 0= idle, 1= run
        this.nextDt = GetValue(o, 'nextDt', 0);
        this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            clock: this.clock.toJSON(),
            commands: this.commands,
            scope: this.scope,
            timeUnit: this.timeUnit,
            dtMode: this.dtMode,
            index: this.index,
            state: this.state,
            nextDt: this.nextDt
        };
    }

    boot() {
        this.scene.events.on('update', this.runNextCommands, this);
    }

    shutdown() {
        super.shutdown();

        this.scene.events.off('update', this.runNextCommands, this);
        this.clock.shutdown();

        this.parent = undefined;
        this.scene = undefined;
        this.clock = undefined;
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
        this.stop();

        this.index = 0;
        this.state = 1;
        if (this.commands.length === 0) {
            this.complete();
        } else {
            this.nextDt = this.getNextDt(0);
            this.clock.start(startAt);
        }
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
        this.state = 0;
        this.clock.stop();
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
        return (this.state === 0);
    }

    get timeScale() {
        return this.clock.timeScale;
    }

    set timeScale(value) {
        this.clock.timeScale = value;
    }

    setTimeScale(value) {
        this.timeScale = value;
    }

    get now() {
        return this.clock.now;
    }

    runNextCommands(time, delta) {
        if (this.timeScale === 0) {
            return;
        }

        var clock = this.clock;
        var nowTime = clock.update(time, delta).now;
        if (!clock.isRunning ||
            (this.nextDt > nowTime)) {
            return;
        }

        while (1) {
            // run a row
            var item = this.commands[this.index];
            var command = item[1];
            if (typeof (command) === 'string') { // [dt, fnName, param0, param1, ...]
                command = ArrayCopy(CMD, item, 1);
            }
            RunCommands(command, this.scope);
            this.emit('runcommand', command, this.scope);
            // run a row

            if (this.index === (this.commands.length - 1)) {
                this.complete();
                return;
            } else {
                // next dt
                this.index++; // point to next item
                this.nextDt = this.getNextDt(this.nextDt);
                if (this.nextDt > nowTime) {
                    return;
                }
                // next dt
            }

        }
    }

    complete() {
        this.state = 0;
        this.clock.stop();
        this.emit('complete', this);
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