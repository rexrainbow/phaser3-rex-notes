import FSM from '../../../logic/fsm/FSM.js';
class Cooldown extends FSM {
    constructor() {
        super({
            eventEmitter: false
        })

        this.extraRemainderTime = 0;
        this.goto('IDLE');
    }

    setCooldownTime(time) {
        this.cooldownTime = time;
        return this;
    }

    request() {
        return this.runMethod('request');
    }

    // IDLE state
    update_IDLE() {
        this.extraRemainderTime = 0;
    }
    request_IDLE() {
        this.next();
        return true;
    }
    next_IDLE() {
        if (this.cooldownTime != null) {
            return 'COOLDOWN';
        }
    }

    // COOLDOWN state
    enter_COOLDOWN() {
        this.remainderTime = this.cooldownTime + this.extraRemainderTime;
    }
    update_COOLDOWN(time, delta) {
        this.remainderTime -= delta;
        if (this.remainderTime < 0) {
            this.extraRemainderTime = -this.remainderTime;
            this.goto('IDLE');
        }
    }
    request_COOLDOWN() {
        return false;
    }

}

export default Cooldown;