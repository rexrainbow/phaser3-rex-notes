'use strict'
import BaseCmd from './BaseCmd.js';

class WaitEventCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'waitevent');
    }

    parse(inst, index) {
        inst.length = 2;
        return inst;
    }

    run(inst) {
        var eventName = this.getEventName(inst);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#WAIT EVENT: ' + eventName);
        }
        this.scenario.wait(eventName);
    }

    getEventName(inst) {
        var eventName = inst[1];
        if (eventName == null) {
            eventName = '';
            inst[1] = eventName;
        }
        return eventName;
    }
}

export default WaitEventCmd;