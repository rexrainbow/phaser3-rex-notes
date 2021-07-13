import FSM from '../../../plugins/fsm.js';

class BaseState extends FSM {
    constructor(parent, config) {
        super(config);

        this.parent = parent; // Bejeweled
        this.board = parent.board; // Bejeweled.board
    }

    shutdown() {
        super.shutdown();
        this.parent = undefined;
        this.board = undefined;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    next() {
        // Wait until all events are completed
        var waitEvents = this.parent.waitEvents;
        if (waitEvents.noWaitEvent) {
            // Go to next state
            super.next();  
        } else {
            // Try again later
            waitEvents.setCompleteCallback(this.next, this);
            console.log('wait')
        }
    }
}

export default BaseState