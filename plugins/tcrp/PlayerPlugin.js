'use strict'

import Phaser from 'phaser';
import EE from 'eventemitter3';
import ClcokPlugin from './../clock-plugin.js';
import GetSceneObject from './../utils/system/GetSceneObject.js';
import runCommands from './../../plugins/runcommands.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

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
        this.index = GetFastValue(o, 'index', 0);
        this.nextDt = undefined;
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
            index: this.index
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
        this.index = 0;
        this.nextDt = undefined;
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

    get now() {
        return this.clock.now;
    }    

    get isComplete() {
        return (this.index >= this.commands.length);
    }

    runNextCommands() {
        if (!this.clock.isRunning) {
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
            this.clock.stop();
            this.emit('complete');
            return false;
        }

        var item = this.commands[this.index];
        var dt = item[0];
        if (typeof (dt) === 'string') {
            dt = parseFloat(dt);
        }
        if (dt > this.clock.now) {
            this.nextDt = dt;
            return false; // exit
        }

        var command = item[1];
        if (typeof (command) === 'string') { // [dt, fnName, param0, param1, ...]
            command = item.slice(1);
        }
        runCommands(command, this.scope);
        this.emit('runcommand', command, this.scope);
        this.index++; // point to next item
        return true; // continue
    }
}

export default PlayerPlugin;