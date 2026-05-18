import { Math as PhaserMath } from 'phaser';
var GetDistance = PhaserMath.Distance.Between;

var IsLocalPointInKnob = function(knob?: any, localX?: any, localY?: any) {
    var centerX = knob.width / 2;
    return GetDistance(centerX, centerX, localX, localY) <= centerX;
}

export default IsLocalPointInKnob;