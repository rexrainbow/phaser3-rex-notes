import OnePointerTracer from "./OnePointerTracer";

class Tap extends OnePointerTracer {
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setMaxHoldTime(GetValue(o, 'maxHoldTime', 300));
        this.tapStart = false;
        return this;
    }

    onDragStart() {
        this.tapStart = true;
    }

    onDragEnd() {
        this.tapStart = false;
    }

    onDrag() {

    }

    setDragThreshold(distance) {
        if (distance === undefined) {
            distance = 0;
        }
        this.dragThreshold = distance;
        return this;
    }

    setMaxHoldTime(time) {
        if (time === undefined) {
            time = 0;
        }
        this.holdTime = time; // ms
        return this;
    }
}
export default Tap;