import GetValueByPosition from './GetValueByPosition.js';

var OnTouchTrack = function (pointer) {
    if (!this.enable || !this.inputActive) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    var value = GetValueByPosition.call(this, pointer.worldX, pointer.worldY);

    this.stopEaseValue();
    if ((this.easeValueDuration === 0) || (Math.abs(this.value - value) < 0.1)) {
        this.value = value;
    } else {
        this.easeValueTo(value);
    }
}

export default OnTouchTrack;