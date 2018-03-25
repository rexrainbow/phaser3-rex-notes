'use strict'

import Phaser from 'phaser';
import ClcokPlugin from './../clock-plugin.js';
import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';
import runCommands from './../../plugins/runcommands.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class PlayerPlugin extends ClcokPlugin {
    constructor(parent, config) {
        super(parent, config);
        //this.resetFromJSON(config);  // this function had been called in super(config)

        this.parent = parent;
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.commands = GetFastValue(o, 'commands', []); // [[dt, cmds], [dt, cmds], ...]
        this.scope = GetFastValue(o, 'scope', undefined);
        this.index = GetFastValue(o, 'index', 0);
        this.nextDt = undefined;
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var o = ClcokPlugin.toJSON.call(this);
        o.commands = this.commands;
        o.scope = this.scope;
        o.index = this.index;
        return o;
    }

    boot() {
        super.boot();
        var eventEmitter = GetEventEmmiter(this.parent);
        eventEmitter.on('update', this.runNextCommands, this);

    }

    shutdown() {
        super.shutdown();
        this.commands = undefined;
    }

    load(commands, scope) {
        commands.sort(function (itemA, itemB) {
            var dtA = itemA[0],
                dtB = itemB[0];
            return (dtA > dtB) ? 1 :
                (dtA < dtB) ? -1 : 0;
        });

        this.commands = commands;
        this.scope = scope;
        return this;
    }

    start(startAt) {
        super.start(startAt);
        this.index = 0;
        this.nextDt = undefined;
        this.runNextCommands();
        return this;
    }

    get isPlaying() {
        return this.isRunning;
    }

    get isComplete() {
        return (this.index >= this.commands.length);
    }

    runNextCommands() {
        if (!this.isRunning) {
            return;
        }
        if ((this.nextDt !== undefined) &&
            (this.nextDt > this.now)) {
            return;
        }
        while (this.runCommand()) {}
    }

    runCommand() {
        if (this.isComplete) {
            // TODO: emit complete event
            this.stop();
            return false;
        }

        var item = this.commands[this.index];
        var dt = item[0];
        if (dt > this.now) {
            this.nextDt = dt;
            return false; // exit
        }

        var command = item[1];
        if (typeof (command) === 'string') { // [dt, fnName, param0, param1, ...]
            command = item.slice(1);
        }
        runCommands(command, this.scope);
        this.index++; // point to next item
        return true; // continue
    }
}

export default PlayerPlugin;