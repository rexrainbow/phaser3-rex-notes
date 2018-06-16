'use strict'

import DragDelta from 'rexPlugins/dragdelta.js';
import State from './State.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scroller {
    constructor(gameObject, config) {       
        this.state = new State(this, config);
        this.dragDelta = new DragDelta(gameObject, config);
    }

    resetFromJSON(o) {
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setSlowDownEnable(GetValue(o, 'slowDownEnable', true));
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = AXISMODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setSlowDownEnable(e) {
        if (e === undefined) {
            e = true;
        }
        this.slowDownEnable = e;
    }


    onDragStart(pointer) {
        super.onDragStart(pointer);

        if (!this.enable) {
            return;
        }

        this.state.next();
    }

    onDragEnd() {
        super.onDragEnd();

        this.state.next();
    }

    onSlowDown() {

    }

    onBack() {

    }
    
    get isDragging() {
        return false;  // TODO
    }

    get outOfBounds() {
        return false; // TODO
    }

    onStateChange() {
        console.log(this.state.state);
    }    
}


/** @private */
const AXISMODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,    
    'v': 2,
    'y': 2
};

export default Scroller;