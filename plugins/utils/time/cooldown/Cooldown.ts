import FSM from '../../../logic/fsm/FSM';
class Cooldown extends FSM {
    compensationTime: any;
    cooldownMode: any;
    cooldownTime: any;
    goto: any;
    next: any;
    remainderTime: any;
    runMethod: any;

    constructor() {
        super({
            eventEmitter: false
        })

        this.goto('IDLE');
    }

    setCooldownTime(time?: any) {
        this.cooldownTime = time;
        this.cooldownMode = (time !== undefined);
        return this;
    }

    request() {
        return this.runMethod('request');
    }

    // IDLE state
    update_IDLE() {
        this.compensationTime = 0;
    }
    request_IDLE() {
        this.next();
        return true;
    }
    next_IDLE() {
        if (this.cooldownMode) {
            return 'COOLDOWN';
        }
    }

    // COOLDOWN state
    enter_COOLDOWN() {
        this.remainderTime = this.cooldownTime + this.compensationTime;
    }
    update_COOLDOWN(time?: any, delta?: any) {
        this.remainderTime -= delta;
        if (this.remainderTime < 0) {
            this.compensationTime = (this.cooldownTime > delta) ? (-this.remainderTime) : 0;
            this.goto('IDLE');
        }
    }
    request_COOLDOWN() {
        return false;
    }

}

export default Cooldown;