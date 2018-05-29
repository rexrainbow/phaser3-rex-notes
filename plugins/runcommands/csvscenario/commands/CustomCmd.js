'use strict'

import BaseCmd from './BaseCmd.js';
import ArrayCopy from './../../../utils/array/Copy.js';
import RunCommands from './../../../runcommands.js';

const SpliceOne = Phaser.Utils.Array.SpliceOne;

class CustomCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, '-');
        this.task = undefined;
    }

    resetFromJSON(o) {
        if (this.task) {
            this.task.off('complete', this.resume, this);
            this.task = undefined;
        }
    }

    parse(cmdPack, index) {
        var cmd = SpliceOne(cmdPack, 0);
        cmdPack = [cmd, cmdPack];
        return cmdPack;
    }

    run(cmdPack) {
        var scenario = this.scenario;
        var task = RunCommands(cmdPack[1], scenario.scope);
        if (task && (typeof (task.once) === 'function')) {
            task.once('complete', this.resume, this);
            this.pause();
            this.task = task;
        } else {
            this.task = undefined;
        }
    }

    pause() {
        this.scenario.pause();
    }

    resume() {
        this.task = undefined;
        var scenario = this.scenario
        scenario.resume();
        scenario.runNextCmd();
    }
}

var CMD = [];

export default CustomCmd;