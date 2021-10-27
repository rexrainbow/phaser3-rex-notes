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
        var modalBehavior = this.parent;
        modalBehavior.transitionIn();
        modalBehavior.delayCall(modalBehavior.transitInTime, this.next, this);
    }
    exit_TRANS_OPNE() {
        var modalBehavior = this.parent;
        modalBehavior.removeDelayCall();
    }
    // TRANS_OPNE

    // OPEN -> TRANS_CLOSE    
    next_OPEN() {
        return 'TRANS_CLOSE';
    }
    enter_OPEN() {
        var modalBehavior = this.parent;
        var duration = modalBehavior.displayTime;
        if (duration >= 0) {
            modalBehavior.delayCall(
                duration,
                modalBehavior.requestClose, // callback
                modalBehavior               // scope
            );
        }
        modalBehavior.onOpen();
    }
    exit_OPEN() {
        var modalBehavior = this.parent;
        modalBehavior.removeDelayCall();
    }
    // OPEN

    // TRANS_CLOSE -> CLOSE
    next_TRANS_CLOSE() {
        return 'CLOSE';
    }
    enter_TRANS_CLOSE() {
        var modalBehavior = this.parent;
        modalBehavior.transitionOut();
        modalBehavior.delayCall(modalBehavior.transitOutTime, this.next, this);
    }
    exit_TRANS_CLOSE() {
        var modalBehavior = this.parent;
        modalBehavior.removeDelayCall();
    }
    // TRANS_CLOSE

    // CLOSE
    next_CLOSE() {
    }
    enter_CLOSE() {
        var modalBehavior = this.parent;
        modalBehavior.onClose();
    }
    exit_CLOSE() {
    }
    // CLOSE
}

export default State;