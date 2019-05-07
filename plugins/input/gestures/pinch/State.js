import FSM from '../../../fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.goto('IDLE');
    }

    enter_IDLE() {
        this.parent.prevDistance = undefined;
        this.parent.scaleFactor = 1;
    }

    enter_RECOGNIZED() {
        this.parent.emit('pinchstart');
    }

    exit_RECOGNIZED() {
        this.parent.emit('pinchend');
    }
}

export default State;