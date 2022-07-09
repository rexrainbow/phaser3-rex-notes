import FSM from '../../fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.init();
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
        transitionBehavior.transitionIn();
        transitionBehavior.delayCall(transitionBehavior.transitInTime, this.next, this);
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
        transitionBehavior.transitionOut();
        transitionBehavior.delayCall(transitionBehavior.transitOutTime, this.next, this);
    }
    exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
    }
    // TRANS_CLOSE

    // CLOSE
    next_CLOSE() {
    }
    enter_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.onClose();
    }
    exit_CLOSE() {
    }
    // CLOSE
}

export default State;