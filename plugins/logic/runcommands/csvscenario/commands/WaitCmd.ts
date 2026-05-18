import BaseCmd from './BaseCmd';

class WaitCmd extends BaseCmd {
    scenario: any;

    constructor(scenario?: any) {
        super(scenario, 'wait');
    }

    parse(inst?: any, index?: any) {
        inst.length = 2;
        var eventName = this.getEventName(inst);
        if (!isNaN(eventName)) {
            inst[1] = parseFloat(eventName);
        }
        return inst;
    }

    run(inst?: any) {
        var eventName = this.getEventName(inst);
        if (typeof (eventName) === 'number') {
            this.waitTime(eventName);
        } else {
            this.waitEvent(eventName);
        }
    }

    waitTime(delayTime?: any) {
        if (delayTime > this.scenario.offset) {
            delayTime -= this.scenario.offset;
            this.scenario.offset = 0;
            if (this.scenario.isDebugMode) {
                this.scenario.log('#WAIT: ' + delayTime);
            }
            this.scenario.wait(delayTime);
        } else {
            this.scenario.offset -= delayTime;
        }
    }

    waitEvent(eventName?: any) {
        if (this.scenario.isDebugMode) {
            this.scenario.log('#WAIT: ' + eventName);
        }
        this.scenario.wait(eventName);
    }

    getEventName(inst?: any) {
        var eventName = inst[1];
        if (eventName == null) {
            eventName = '';
            inst[1] = eventName;
        }
        return eventName;
    }
}

export default WaitCmd;