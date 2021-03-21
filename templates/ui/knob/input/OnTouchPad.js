import IsLocalPointInKnob from './IsLocalPointInKnob.js';
import EaseValueTo from './EaseValueTo.js';

const GetAngle = Phaser.Math.Angle.Between;
const NormalizeAngle = Phaser.Math.Angle.Normalize;

var OnTouchPad = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }
    var knob = this.sizerChildren.knob;
    if (!IsLocalPointInKnob(knob, localX, localY)) {
        return;
    }

    var centerX = knob.width / 2;
    var startAngle = knob.startAngle;
    var endAngle = GetAngle(centerX, centerX, localX, localY);
    var deltaAngle = (knob.anticlockwise) ? (startAngle - endAngle) : (endAngle - startAngle);
    var value = NormalizeAngle(deltaAngle) / (2 * Math.PI);

    EaseValueTo.call(this, value);
}

var InstallEvents = function () {
    var knob = this.sizerChildren.knob;
    knob.setInteractive()
        .on('pointerdown', OnTouchPad, this)
        .on('pointermove', OnTouchPad, this);
}

export default InstallEvents;