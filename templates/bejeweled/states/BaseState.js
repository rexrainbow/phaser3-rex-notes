import FSM from '../../../plugins/fsm.js';

class BaseState extends FSM {
    constructor(parent, config) {
        super(config);

        this.parent = parent;                 // Bejeweled
        this.board = parent.board;            // Bejeweled.board
        this.waitEvents = parent.waitEvents;  // Bejeweled.waitEvents
    }

    shutdown() {
        super.shutdown();
        this.parent = undefined;
        this.board = undefined;
        this.waitEvents = undefined;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    next() {
        // Wait until all events are completed
        if (this.waitEvents.noWaitEvent) {
            // Go to next state
            super.next();  
        } else {
            // Try again later
            this.waitEvents.setCompleteCallback(this.next, this);
        }
    }
}

export default BaseState