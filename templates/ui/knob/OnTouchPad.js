var GetDistance = Phaser.Math.Distance.Between;
var GetAngle = Phaser.Math.Angle.Between;
var NormalizeAngle = Phaser.Math.Angle.Normalize;

var OnTouchPad = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }
    var knob = this.sizerChildren.knob;
    var centerX = knob.width / 2;
    if (GetDistance(centerX, centerX, localX, localY) > centerX) {
        return;
    }

    var startAngle = knob.startAngle;
    var endAngle = GetAngle(centerX, centerX, localX, localY);
    var deltaAngle = (knob.anticlockwise) ? (startAngle - endAngle) : (endAngle - startAngle);
    var value = NormalizeAngle(deltaAngle) / (2 * Math.PI);

    if ((this.easeValueDuration === 0) || (Math.abs(this.value - value) < 0.1)) {
        this.value = value;
    } else {
        this.easeValueTo(value);
    }
}

export default OnTouchPad;