'use strict'

import Movement from './Movement.js';

class SlowDown {
    constructor() {
        this.value;
        this.dir; // true:+, false:-
        this.movement = new Movement();
    }

    init(start, dir, speed, dec) {
        this.value = start;
        this.dir = dir;
        this.movement
            .setSpeed(speed)
            .setAcceleration(-dec);
        return this;
    }

    update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);
        if (this.dir) {
            this.value += d;
        } else {
            this.value -= d;
        }
        return this;
    }

    get complete() {
        return !this.movement.isMoving;
    }
}
export default SlowDown;