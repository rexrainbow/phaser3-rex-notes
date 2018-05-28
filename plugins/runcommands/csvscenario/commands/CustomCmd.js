'use strict'

import BaseCmd from './BaseCmd.js';
import ArrayCopy from './../../../utils/array/Copy.js';
import RunCommands from './../../../runcommands.js';

const SpliceOne = Phaser.Utils.Array.SpliceOne;

class CustomCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario);
        this.task = undefined;
    }

    resetFromJSON(o) {
        // TODO
    }

    parse(cmdPack, index) {
        var cmd = SpliceOne(cmdPack, 0);
        cmdPack = [cmd, cmdPack];
        return cmdPack;
    }

    run(cmdPack) {
        var task = RunCommands(cmdPack[1], this.scenario.scope);
        if (task && (typeof (task.once) === 'function')) {
            // task.once('complete', this.runNextCommands, this);
            this.task = task;
        } else {
            this.task = undefined;
        }
        if (this.task) {
            this.scenario.pause();
        }
    }
}

var CMD = [];

export default CustomCmd;