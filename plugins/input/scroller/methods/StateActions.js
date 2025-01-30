const SnapTo = Phaser.Math.Snap.To;
const Clamp = Phaser.Math.Clamp;

// this: Scroller

// enter_DRAG
var OnDragStart = function () {
    this.emit('dragstart');
}

// exit_DRAG
var OnDragEnd = function () {
    this.emit('dragend');
}

// everyTick_DRAG
var Dragging = function () {
    this.value += this.dragDelta;
}

// enter_SLIDE 
var OnSliding = function () {
    var start = this.value;
    var speed = this.dragSpeed;
    var snapStep = this.snapStep;
    var snapMode = !!snapStep;

    if (!snapMode) {
        if (speed === 0) {
            this._slowDown.stop();
            this._state.next();

        } else {
            var dec = this.slidingDeceleration;
            this._slowDown.init(start, (speed > 0), speed, dec);

        }

    } else { // snapMode
        var end = start;
        // Distance of deceleration
        var dist = (speed === 0) ? 0 : (speed * speed) / (2 * this.slidingDeceleration);
        end += (speed > 0) ? dist : -dist;
        end = SnapTo(end, snapStep, this.minValue);
        // Distance of snapping
        dist = Math.abs(end - start);

        if (dist > 0) {
            var dec;
            if (speed === 0) {
                dec = this.backDeceleration;
                speed = Math.sqrt(2 * dec * dist);
            } else {
                dec = (speed * speed) / (2 * dist);
                dec *= 0.99; // Smaller deceleration value
            }

            this._slowDown.init(start, undefined, speed, dec, end);

        } else {
            this._slowDown.stop();
            this._state.next();

        }
    }
}

// everyTick_SLIDE
var Sliding = function (time, delta) {
    delta *= 0.001;
    var newValue = this._slowDown.update(delta).value;
    if (this.overMax(newValue)) {
        this.value = this.maxValue;
        this._slowDown.stop();
    } else if (this.overMin(newValue)) {
        this.value = this.minValue;
        this._slowDown.stop();
    } else {
        this.value = newValue;
    }
}

// enter_BACK
var OnBack = function () {
    var start = this.value;
    var end = (this.outOfMinBound) ? this.minValue : this.maxValue;
    var dist = Math.abs(end - start);
    var dec = this.backDeceleration;
    var speed = Math.sqrt(2 * dec * dist);
    this._slowDown.init(start, undefined, speed, dec, end);
}

// everyTick_BACK
var Back = function (time, delta) {
    delta *= 0.001;
    this.value = this._slowDown.update(delta).value;

    if (!this._slowDown.isMoving) {
        this._state.next();
    }
}

// exit_SLIDE, exit_BACK
var Stop = function () {
    this._slowDown.stop();
}

export {
    // DRAG
    OnDragStart, // enter_DRAG
    OnDragEnd,   // exit_DRAG
    Dragging,    // everyTick_DRAG
    // SLIDE
    OnSliding,   // enter_SLIDE 
    Sliding,     // everyTick_SLIDE
    // BACK
    OnBack,  // enter_BACK
    Back,    // everyTick_BACK

    Stop,        // exit_SLIDE, exit_BACK
}