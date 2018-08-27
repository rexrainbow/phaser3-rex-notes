'use strict'

import Movement from './Movement.js';

class MoveTo {
    constructor() {
        this.start;
        this.end;
        this.value;
        this.movement = new Movement();
    }

    init(start, end, speed) {
        this.start = start;
        this.end = end;
        this.value = start;
        this.movement.setSpeed(speed);
        return this;
    }

    update(delta) {
        var d = this.movement.getDeltaValue(delta);
        if (this.start < this.end) {
            this.value += d;
            if (this.value >= this.end) {
                this.value = this.end;
            }
        } else {
            this.value -= d;
            if (this.value <= this.end) {
                this.value = this.end;
            }
        }
        return this;
    }

    get complete() {
        return (this.value === this.end);
    }
}
export default MoveTo;