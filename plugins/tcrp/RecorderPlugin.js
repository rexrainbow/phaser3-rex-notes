'use strict'

import Phaser from 'phaser';
import ClcokPlugin from './../clock-plugin.js';
import Clone from './../../plugins/utils/object/Clone.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class RecorderPlugin {
    constructor(parent, config) {
        this.clock = new ClcokPlugin(parent);
        this.parent = parent;
        this.resetFromJSON(config); // this function had been called in super(config)
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        var clockConfig = GetFastValue(o, 'clock', undefined);
        this.clock.resetFromJSON(clockConfig);
        this.commands = GetFastValue(o, 'commands', []); // [[dt, cmd], [dt, cmd], ...]
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            clock: this.clock.toJSON(),
            commands: this.commands
        };
    }

    shutdown() {
        this.clock.shutdown();
        this.commands = undefined;
    }

    destroy() {
        this.shutdown();
    }

    start(startAt) {
        this.clock.start(startAt);
        this.clean();
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

    get isRecording() {
        return this.clock.isRunning;
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

    addCommand(command, offset) {
        if (!this.isRecording) {
            return this;
        }
        if (offset === undefined) {
            offset = 0;
        }
        var dt = this.clock.now + offset;
        this.commands.push([dt, command]);
        return this;
    }

    getCommands(isRef) {
        if (isRef === undefined) {
            isRef = false;
        }
        var commands;
        if (isRef) {
            commands = this.commands;
        } else {
            commands = Clone(this.commands);
        }
        return commands;
    }

    clean() {
        this.commands.length = 0;
    }
}

export default RecorderPlugin;