import FSM from '../../../fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.goto('IDLE');
    }

    enter_IDLE() {
        this.parent.tapsCount = 0;
    }

    enter_BEGIN() {
        this.parent.tapsCount = 0;
        this.parent.emit('tappingstart', this.parent);
        this.parent.start();
    }

    exit_BEGIN() {
        this.parent.stop();
    }

    enter_RECOGNIZED() {
        this.parent.emit('tap', this.parent);
    }
}

export default State;