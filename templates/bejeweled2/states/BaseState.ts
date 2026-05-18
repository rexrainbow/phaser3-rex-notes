import FSM from '../../../plugins/fsm';

class BaseState extends FSM {
    bejeweled: any;
    boardWrapper: any;
    waitEvents: any;

    constructor(bejeweled?: any, config?: any) {
        super(config);

        this.bejeweled = bejeweled;                 // Bejeweled
        this.boardWrapper = bejeweled.boardWrapper; // Bejeweled.boardWrapper
        this.waitEvents = bejeweled.waitEvents;     // Bejeweled.waitEvents
    }

    shutdown() {
        super.shutdown();
        this.bejeweled = undefined;
        this.boardWrapper = undefined;
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