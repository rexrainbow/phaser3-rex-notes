'use strict'
import BaseCmd from './BaseCmd.js';

class GotoCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'goto');
    }

    parse(cmdPack, index) {
        cmdPack.length = 2;
        return cmdPack;
    }

    run(cmdPack) {
        var label = this.getLabel(cmdPack);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#GOTO label: ' + label);
        }
        this.scenario.goto(label);
    }

    getLabel(cmdPack) {
        var label = cmdPack[1];
        if (label == null) {
            label = '';
            cmdPack[1] = label;
        }
        return label;
    }
}

export default GotoCmd;