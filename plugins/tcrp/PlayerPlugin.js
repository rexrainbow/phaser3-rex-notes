'use strict'

import Phaser from 'phaser';
import EE from 'eventemitter3';
import ClcokPlugin from './../clock-plugin.js';
import GetSceneObject from './../utils/system/GetSceneObject.js';
import runCommands from './../../plugins/runcommands.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

var CMD = []; // reuse this array
class PlayerPlugin extends EE {
    constructor(parent, config) {
        super();
        this.clock = new ClcokPlugin(parent);
        this.parent = parent;
        this.resetFromJSON(config); // this function had been called in super(config)
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        var clockConfig = GetFastValue(o, 'clock', undefined);
        this.clock.resetFromJSON(clockConfig);
        this.commands = GetFastValue(o, 'commands', []); // [[dt, cmds], [dt, cmds], ...]
        this.scope = GetFastValue(o, 'scope', undefined);
        this.timeUnit = GetFastValue(o, 'timeUnit', 0);
        this.dtMode = GetFastValue(o, 'dtMode', 0);
        this.index = GetFastValue(o, 'index', 0);
        this.nextDt = GetFastValue(o, 'nextDt', 0);
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
            nextDt: this.nextDt
        };
    }

    boot() {
        var scene = GetSceneObject(this.parent);
        scene.sys.events.on('update', this.runNextCommands, this);

    }

    shutdown() {
        this.clock.shutdown();
        var scene = GetSceneObject(this.parent);
        scene.sys.events.off('update', this.runNextCommands, this);
        this.removeAllListeners();
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
    }

    load(commands, scope, config) {
        this.timeUnit = GetFastValue(config, 'timeUnit', this.timeUnit);
        if (typeof (this.timeUnit) === 'string') {
            this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }
        this.dtMode = GetFastValue(config, 'dtMode', this.dtMode);
        if (typeof (this.dtMode) === 'string') {
            this.dtMode = DTMODE[this.dtMode];
        }

        commands = commands.filter(function (item) {
            var dt = item[0];
            return !isNaN(dt);
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
        this.index = 0;
        this.nextDt = this.getNextDt(0);
        this.clock.start(startAt);
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
        return this;
    }

    seek(time) {
        this.clock.seek(time);
        return this;
    }

    get isPlaying() {
        return this.clock.isRunning;
    }

    get isComplete() {
        return (this.index >= this.commands.length);
    }

    get timeScale() {
        return this.clock.timeScale;
    }

    set timeScale(timeScale) {
        this.clock.timeScale = timeScale;
    }

    get now() {
        return this.clock.now;
    }

    runNextCommands() {
        if (!this.clock.isRunning ||
            (this.nextDt > this.clock.now)) {
            return;
        }

        while (1) {
            // complete
            if (this.isComplete) {
                this.clock.stop();
                this.emit('complete');
                return;
            }
            // complete            

            // run a row
            var item = this.commands[this.index];
            var command = item[1];
            if (typeof (command) === 'string') { // [dt, fnName, param0, param1, ...]
                CMD.length = item.length - 1;
                for (var i = 0, len = CMD.length; i < len; i++) {
                    CMD[i] = item[i + 1];
                }
                command = CMD;
            }
            runCommands(command, this.scope);
            this.emit('runcommand', command, this.scope);
            // run a row

            // next dt
            this.index++; // point to next item
            this.nextDt = this.getNextDt(this.nextDt);
            if (this.nextDt > this.clock.now) {
                return;
            }
            // next dt
        }
    }

    getNextDt(currentDt) {
        if (this.isComplete) {
            return currentDt;
        }
        var dt = this.commands[this.index][0];
        if (this.timeUnit === 1) { // sec mode
            dt = dt * 1000;
        }

        if (this.dtMode === 1) {
            dt += currentDt;
        }

        return dt;
    }
}

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
};

const DTMODE = {
    abs: 0,
    absolute: 0,
    acc: 1,
    accumulation: 1
};

export default PlayerPlugin;