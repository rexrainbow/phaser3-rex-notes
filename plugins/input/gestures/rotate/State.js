import FSM from '../../../fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.goto('IDLE');
    }

    enter_IDLE() {
        this.parent.prevAngle = undefined;
        this.parent.angle = 0;
    }

    enter_RECOGNIZED() {
        this.parent.emit('rotatestart', this.parent);
    }

    exit_RECOGNIZED() {
        this.parent.emit('rotateend', this.parent);
    }
}

export default State;