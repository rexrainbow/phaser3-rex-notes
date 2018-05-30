'use strict'
import BaseCmd from './BaseCmd.js';

class IfCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'if');
    }

    parse(cmdPack, index) {
        cmdPack.length = 4;
        var cond = '(' + this.getCond(cmdPack) + ')';
        cmdPack[1] = new Function('return ' + cond);
        return cmdPack;
    }

    run(cmdPack) {
        var condFn = this.getCond(cmdPack);
        var result = condFn.call(this.scenario.scope);
        var nextLabel = (result)? this.getTrueLabel(cmdPack) : this.getFalseLabel(cmdPack);
        if (nextLabel !== '') {
            if (this.scenario.isDebugMode) {
                this.scenario.log('#IF ' + result + '- GOTO label: ' + nextLabel);
            }
            this.scenario.goto(nextLabel);
        }
    }

    getCond(cmdPack) {
        var cond = cmdPack[1];
        if ((cond == null) || (cond === '')) {
            cond = 'true';
            cmdPack[1] = cond;
        }
        return cond;
    }

    getTrueLabel(cmdPack) {
        var label = cmdPack[2];
        if (label == null) {
            label = '';
            cmdPack[2] = label;
        }
        return label;
    }

    getFalseLabel(cmdPack) {
        var label = cmdPack[3];
        if (label == null) {
            label = '';
            cmdPack[3] = label;
        }
        return label;
    }
}

export default IfCmd;