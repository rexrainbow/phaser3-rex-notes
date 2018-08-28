'use strict'

import FSM from 'rexPlugins/fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.init();
    }

    init() {
        this.start('IDLE');
    }

    // IDLE -> DRAG
    next_IDLE() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        }
        return nextState;
    }
    // IDLE    

    // DRAG -> BACK|SLIDE|IDLE
    next_DRAG() {
        var nextState, parent = this.parent;
        if (!parent.isDragging) {
            if (parent.outOfBounds) {
                nextState = 'BACK';
            } else if (parent.slidingEnable) {
                nextState = 'SLIDE';
            } else {
                nextState = 'IDLE';
            }
        }
        return nextState;
    }
    // DRAG    

    // SLIDE -> DRAG|IDLE
    next_SLIDE() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else if (!parent.isSliding) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_SLIDE() {
        this.parent.onSliding();
    }
    exit_SLIDE() {
        this.parent.stop();
    }
    // SLIDE    

    // BACK -> DRAG|IDLE
    next_BACK() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else if (!parent.isPullBack) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_BACK() {
        this.parent.onPullBack();
    }
    exit_BACK() {
        this.parent.stop();
    }
    // BACK
}

export default State;