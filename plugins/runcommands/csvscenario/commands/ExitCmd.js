'use strict'
import BaseCmd from './BaseCmd.js';

class ExitCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario);
    }

    parse(cmdPack, index) {
        cmdPack.length = 1;
        return cmdPack;
    }

    run(cmdPack) {
        this.scenario.log("#EXIT");
        this.scenario.complete();         
    }
}

export default ExitCmd;