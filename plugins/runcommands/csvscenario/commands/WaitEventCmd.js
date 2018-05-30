'use strict'
import BaseCmd from './BaseCmd.js';

class WaitEventCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'waitevent');
    }

    parse(cmdPack, index) {
        cmdPack.length = 2;
        return cmdPack;
    }

    run(cmdPack) {
        var eventName = this.getEventName(cmdPack);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#WAIT EVENT: ' + eventName);
        }
        this.scenario.wait(eventName);
    }

    getEventName(cmdPack) {
        var eventName = cmdPack[1];
        if (eventName == null) {
            eventName = '';
            cmdPack[1] = eventName;
        }
        return eventName;
    }
}

export default WaitEventCmd;