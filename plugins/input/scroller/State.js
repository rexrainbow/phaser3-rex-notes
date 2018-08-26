'use strict'

import FSM from 'rexPlugins/fsm.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class State extends FSM {
    constructor(parent, config) {
        super();
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

    // DRAG -> BACK|SLOW|IDLE
    next_DRAG() {
        var nextState, parent = this.parent;
        if (!parent.isDragging) {
            if (parent.outOfBounds) {
                nextState = 'BACK';
            } else if (parent.slowDownEnable) {
                nextState = 'SLOW';
            } else {
                nextState = 'IDLE';
            }
        }
        return nextState;
    }
    // DRAG    

    // SLOW -> DRAG|IDLE
    next_SLOW() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_SLOW() {
        this.parent.slowDown();
    }
    exit_SLOW() {
        this.parent.stop();
    }
    // SLOW    

    // BACK -> DRAG|IDLE
    next_BACK() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_BACK() {
        this.parent.rollback();
    }
    exit_BACK() {
        this.parent.stop();
    }
    // BACK
}

export default State;