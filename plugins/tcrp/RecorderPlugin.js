'use strict'

import Phaser from 'phaser';
import ClcokPlugin from './../clock-plugin.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class RecorderPlugin extends ClcokPlugin {
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
        this.commands = GetFastValue(o, 'commands', []); // [[dt, cmd], [dt, cmd], ...]
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        var o = ClcokPlugin.toJSON.call(this);
        o.commands = this.commands;
        return o;
    }

    shutdown() {
        super.shutdown();
        this.commands = undefined;
    }

    start(startAt) {
        super.start(startAt);
        this.clean();
        return this;
    }

    get isRecording() {
        return this.isRunning;
    }

    addCommand(command, offset) {
        if (!this.isRecording) {
            return this;
        }
        if (offset === undefined) {
            offset = 0;
        }
        var dt = this.now + offset;
        this.commands.push([dt, command]);
        return this;
    }

    getCommands() {
        return this.commands;
    }

    clean() {
        this.commands.length = 0;
    }    
}

export default RecorderPlugin;