'use strict'

import Clock from 'rexPlugins/clock.js'
import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';
import ArrayCopy from 'rexPlugins/utils/array/Copy.js';
import RunCommands from 'rexPlugins/runcommands.js';

const EE = Phaser.Events.EventEmitter;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class Player extends EE {
    constructor(parent, config) {
        super();
        this.clock = new Clock(parent, {
            tickMe: false
        });
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
        this.state = GetFastValue(o, 'state', 0); // 0= idle, 1= run
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
            state: this.state,
            nextDt: this.nextDt
        };
    }

    boot() {
        var scene = GetSceneObject(this.parent);
        scene.events.on('update', this.runNextCommands, this);
    }

    shutdown() {
        super.shutdown();
        this.clock.shutdown();
        var scene = GetSceneObject(this.parent);
        scene.events.off('update', this.runNextCommands, this);
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
    }

    load(commands, scope, config) {
        this.stop();
        this.timeUnit = GetFastValue(config, 'timeUnit', this.timeUnit);
        if (typeof (this.timeUnit) === 'string') {
            this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }
        this.dtMode = GetFastValue(config, 'dtMode', this.dtMode);
        if (typeof (this.dtMode) === 'string') {
            this.dtMode = DTMODE[this.dtMode];
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

    set timeScale(timeScale) {
        this.clock.timeScale = timeScale;
    }

    get now() {
        return this.clock.now;
    }

    runNextCommands(time, delta) {
        var clock = this.clock;
        clock.update(time, delta);
        var clockNowTime = clock.now;
        if (!clock.isRunning ||
            (this.nextDt > clockNowTime)) {
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
                if (this.nextDt > clockNowTime) {
                    return;
                }
                // next dt
            }

        }
    }

    complete() {
        this.state = 0;
        this.clock.stop();
        this.emit('complete');
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