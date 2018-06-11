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

    // IDLE
    next_IDLE() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        }
        return nextState;
    }
    // IDLE    

    // DRAG
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

    // SLOW
    next_SLOW() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else {
            nextState = 'IDLE';
        }
        return nextState;
    }
    // SLOW    

    // BACK
    next_BACK() {
        var nextState, parent = this.parent;
        if (parent.isDragging) {
            nextState = 'DRAG';
        } else {
            nextState = 'IDLE';
        }
        return nextState;
    }
    // BACK
}

export default State;