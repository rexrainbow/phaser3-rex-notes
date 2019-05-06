import OnePointerTracer from "./OnePointerTracer";

class Press extends OnePointerTracer {
    resetFromJSON(o) {
        super.resetFromJSON(o);        
        this.setDragThreshold(GetValue(o, 'threshold', 9));
        this.setMinHoldTime(GetValue(o, 'minHoldTime', 251));
        this.pressStart = false;
        return this;
    }

    onDragStart() {
        this.pressStart = true;
    }

    onDragEnd() {
        this.pressStart = false;
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

    setMinHoldTime(time) {
        if (time === undefined) {
            time = 0;
        }
        this.holdTime = time; // ms
        return this;
    }
}
export default Press;