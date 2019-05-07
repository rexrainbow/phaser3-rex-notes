import FSM from '../../../fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.goto('IDLE');
    }

    enter_BEGIN() {
        this.parent.start();
    }

    exit_BEGIN() {
        this.parent.stop();
    }

    enter_RECOGNIZED() {
        this.parent.emit('pressstart');
    }

    exit_RECOGNIZED() {
        this.parent.emit('pressend');
    }
}

export default State;