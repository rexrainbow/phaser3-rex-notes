import FSM from '../../fsm.js';

/*
graph TD

IDLE --> TRAN_OPEN
TRAN_OPEN --> |TransitionIn<br>transitInTime| OPEN
OPEN --> TRANS_CLOSE
TRANS_CLOSE --> |TransitionOut<br>transitOutTime| CLOSE
CLOSE --> IDLE
*/

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;

        var initState = config.initState || 'IDLE';
        this.start(initState);
    }

    init() {
        this.start('IDLE');
    }

    // IDLE -> TRANS_OPNE
    next_IDLE() {
        return 'TRANS_OPNE';
    }
    // IDLE

    // TRANS_OPNE -> OPEN
    next_TRANS_OPNE() {
        return 'OPEN';
    }
    enter_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        var delay = transitionBehavior.runTransitionInCallback();
        transitionBehavior.delayCall(delay, this.next, this);
    }
    exit_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // TRANS_OPNE

    // OPEN -> TRANS_CLOSE
    next_OPEN() {
        return 'TRANS_CLOSE';
    }
    enter_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.onOpen();
    }
    exit_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // OPEN

    // TRANS_CLOSE -> CLOSE
    next_TRANS_CLOSE() {
        return 'CLOSE';
    }
    enter_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        var delay = transitionBehavior.runTransitionOutCallback();
        transitionBehavior.delayCall(delay, this.next, this);
    }
    exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // TRANS_CLOSE

    // CLOSE -> IDLE
    next_CLOSE() {
        return 'IDLE';
    }
    enter_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.onClose();
        this.next();
    }
    exit_CLOSE() {
    }
    // CLOSE
}

export default State;