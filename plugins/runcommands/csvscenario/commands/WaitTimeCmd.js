'use strict'
import BaseCmd from './BaseCmd.js';

class WaitTimeCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'waittime');
    }

    parse(inst, index) {
        var delayTime = parseFloat(this.getDelayTime(inst));
        if (delayTime <= 0) {
            return; // ignore this command
        }

        inst[1] = delayTime
        inst.length = 2;
        return inst;
    }

    run(inst) {
        var delayTime = this.getDelayTime(inst);
        if (delayTime > this.scenario.offset) {
            delayTime -= this.scenario.offset;
            this.scenario.offset = 0;
            if (this.scenario.isDebugMode) {
                this.scenario.log('#WAIT TIME: ' + delayTime);
            }
            this.scenario.wait(delayTime);
        } else {
            this.scenario.offset -= delayTime;
        }
    }

    getDelayTime(inst) {
        var delay = inst[1];
        if (delay == null) {
            delay = 0;
            inst[1] = delay;
        }
        return delay;
    }
}

export default WaitTimeCmd;