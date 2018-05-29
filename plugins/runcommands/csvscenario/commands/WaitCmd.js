'use strict'
import BaseCmd from './BaseCmd.js';

class WaitCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario);
    }

    parse(cmdPack, index) {
        if (!isNaN(cmdPack[1])) {
            cmdPack[0] = 'waittime';
        } else {
            cmdPack[0] = 'waitevent';
        }
        return this.scenario.getCmdHandler(cmdPack).parse(cmdPack, index);
    }
}

export default WaitCmd;