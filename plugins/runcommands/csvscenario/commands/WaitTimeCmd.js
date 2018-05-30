'use strict'
import BaseCmd from './BaseCmd.js';

class WaitTimeCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'waittime');
    }

    parse(cmdPack, index) {
        var delayTime = parseFloat(this.getDelayTime(cmdPack));
        if (delayTime <= 0) {
            return; // ignore this command
        }

        cmdPack[1] = delayTime
        cmdPack.length = 2;
        return cmdPack;
    }

    run(cmdPack) {
        var delayTime = this.getDelayTime(cmdPack);
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

    getDelayTime(cmdPack) {
        var delay = cmdPack[1];
        if (delay == null) {
            delay = 0;
            cmdPack[1] = delay;
        }
        return delay;
    }
}

export default WaitTimeCmd;