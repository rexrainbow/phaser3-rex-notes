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
    var centerX = this.width / 2;
    var centerY = this.height / 2;
    var radius = Math.min(centerX, centerY);
    if (GetDistance(centerX, centerY, localX, localY) > radius) {
        return;
    }

    var knob = this.sizerChildren.knob;
    var endAngle = GetAngle(centerX, centerX, localX, localY);
    var deltaAngle = (knob.anticlockwise) ? (knob.startAngle - endAngle) : (endAngle - knob.startAngle);
    var value = NormalizeAngle(deltaAngle) / (2 * Math.PI);

    if (this.easeValueDuration === 0) {
        this.value = value;
    } else {
        this.easeValueTo(value);
    }
}

export default OnTouchPad;