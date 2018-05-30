'use strict'
import BaseCmd from './BaseCmd.js';

class WaitCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'wait');
    }

    parse(inst, index) {
        if (!isNaN(inst[1])) {
            inst[0] = 'waittime';
        } else {
            inst[0] = 'waitevent';
        }
        return this.scenario.getCmdHandler(inst).parse(inst, index);
    }
}

export default WaitCmd;