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
    if (speed === 0) {
        this._slowDown.stop();
        this._state.next();
        return;
    }
    var dec = this.slidingDeceleration;
    this._slowDown.init(start, (speed > 0), Math.abs(speed), dec)
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
var Stop = function() {
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