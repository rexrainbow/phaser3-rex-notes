'use strict'

import Movement from './Movement.js';

class SlowDown {
    constructor() {
        this.value;
        this.dir; // true:+, false:-
        this.movement = new Movement();
    }

    init(start, dir, speed, dec, end) {
        this.value = start;
        this.end = end;
        if (end !== undefined) {
            this.dir = (start < end);
        } else {
            this.dir = dir;
        }

        this.movement
            .setSpeed(speed)
            .setAcceleration(-dec);
        return this;
    }

    stop() {
        this.movement.reset();
    }

    update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);
        if (d > 0) {
            if (this.dir) {
                this.value += d;
            } else {
                this.value -= d;
            }
        } else { // d === 0
            if (this.end !== undefined) {
                this.value = this.end;
            }
        }
        return this;
    }

    get isMoving() {
        return this.movement.isMoving;
    }
}
export default SlowDown;