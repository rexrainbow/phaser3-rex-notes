'use strict'
import BaseCmd from './BaseCmd.js';

class WaitEventCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario);
    }

    resetFromJSON(o) {
        // TODO
    }

    parse(cmdPack, index) {
        cmdPack.length = 2;
        return cmdPack;
    }

    run(cmdPack) {
        var eventName = this.getEventName(cmdPack);
        this.scenario.log("#WAIT EVENT:" + eventName);
        this.scenario.pause();
    }

    getEventName(cmdPack) {
        return cmdPack[1];
    }
}

export default WaitEventCmd;