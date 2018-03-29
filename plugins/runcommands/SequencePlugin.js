'use strict'

import Phaser from 'phaser';
import EE from 'eventemitter3';
import runCommands from './../../plugins/runcommands.js';
import ArrCopy from './../../plugins/utils/array/Copy.js';

class SequencePlugin extends EE {
    constructor(parent, config) {
        super();

        this.commands = [];
        this.scope = undefined;
        this.config = undefined;
        this.index = 0;
        this.curTask = undefined;
    }

    load(commands, scope, config) {
        this.commands = ArrCopy(this.commands, commands);
        this.scope = scope;
        this.config = config;
        return this;
    }

    start() {
        this.index = 0;
        this.runNextCommands();
        return this;
    }

    pause() {
        if (this.curTask && this.curTask.pause) {
            this.curTask.pause();
        }
        return this;
    }

    resume() {
        if (this.curTask && this.curTask.resume) {
            this.curTask.resume();
        }
        return this;
    }

    get completed() {
        return (this.index >= this.commands.length);
    }

    get currentCommandIndex() {
        return (this.index - 1);
    }

    runNextCommands() {
        var task;
        while (1) {
            if (this.completed) {
                this.emit('complete');
                return this;
            }

            task = runCommands(this.commands[this.index], this.scope);
            this.index++;
            if (task && (typeof (task.once) === 'function')) {
                task.once('complete', this.runNextCommands, this);
                this.curTask = task;
                return this;
            }
        }
    }
}

export default SequencePlugin;