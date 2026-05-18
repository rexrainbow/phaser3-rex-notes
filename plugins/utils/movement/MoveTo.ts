import Movement from './Movement';

class MoveTo {
    end: any;
    movement: any;
    start: any;
    value: any;

    constructor() {
        this.start;
        this.end;
        this.value;
        this.movement = new Movement();
    }

    init(start?: any, end?: any, speed?: any) {
        this.start = start;
        this.end = end;
        this.value = start;
        this.movement
            .setSpeed(speed)
            .setAcceleration(0);
        return this;
    }

    stop() {
        this.movement.reset();
    }

    update(delta?: any) {
        // delta in sec
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

    get isMoving() {
        return (this.value !== this.end);
    }
}
export default MoveTo;