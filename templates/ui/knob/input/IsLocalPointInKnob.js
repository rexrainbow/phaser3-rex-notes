import { Math as PhaserMath } from 'phaser';
var GetDistance = PhaserMath.Distance.Between;

var IsLocalPointInKnob = function (knob, localX, localY) {
    var centerX = knob.width / 2;
    return GetDistance(centerX, centerX, localX, localY) <= centerX;
}

export default IsLocalPointInKnob;