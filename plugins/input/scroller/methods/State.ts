import FSM from '../../../fsm';
import {
    OnDragStart, OnDragEnd, Dragging,
    OnSliding, Sliding,
    OnBack, Back,
    Stop,
} from './StateActions';

class State extends FSM {
    parent: any;

    next: any;
    start: any;

    constructor(parent?: any, config?: any) {
        super(config);
        this.parent = parent;
        this.init();
    }

    init() {
        this.start('IDLE');
    }

    // IDLE -> DRAGBEGIN|DRAG
    next_IDLE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = (parent.dragThreshold === 0) ? 'DRAG' : 'DRAGBEGIN';
        }
        return nextState;
    }
    update_IDLE(time?: any, delta?: any) {
        this.next();
    }
    // IDLE

    // DRAGBEGIN -> DRAG|IDLE
    next_DRAGBEGIN() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = (dragState.pointer.getDistance() >= parent.dragThreshold) ? 'DRAG' : 'DRAGBEGIN';
        } else { // dragState.isUp
            nextState = 'IDLE';
        }
        return nextState;
    }
    update_DRAGBEGIN(time?: any, delta?: any) {
        this.next();
    }
    // DRAGBEGIN

    // DRAG -> BACK|SLIDE|IDLE
    next_DRAG() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isUp) {
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
    update_DRAG(time?: any, delta?: any) {
        var parent = this.parent,
            dragState = parent.dragState;
        if (dragState.justMoved) {
            Dragging.call(parent);
        }
        this.next();
    }
    enter_DRAG() {
        OnDragStart.call(this.parent);
    }
    exit_DRAG() {
        OnDragEnd.call(this.parent);
    }
    // DRAG    

    // SLIDE -> DRAG|IDLE
    next_SLIDE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = 'DRAG';
        } else if (!parent.isSliding) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_SLIDE() {
        OnSliding.call(this.parent);
    }
    exit_SLIDE() {
        Stop.call(this.parent);
    }
    update_SLIDE(time?: any, delta?: any) {
        Sliding.call(this.parent, time, delta);
        this.next();
    }
    // SLIDE    

    // BACK -> DRAG|IDLE
    next_BACK() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = 'DRAG';
        } else if (!parent.isPullBack) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_BACK() {
        OnBack.call(this.parent);
    }
    exit_BACK() {
        Stop.call(this.parent);
    }
    update_BACK(time?: any, delta?: any) {
        Back.call(this.parent, time, delta);
        this.next();
    }
    // BACK
}

export default State;