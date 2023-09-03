import { RotationPointAngle } from './Const.js';

const AngleBetween = Phaser.Math.Angle.Between;
const RotationPointRotation = Phaser.Math.DegToRad(RotationPointAngle);

var AddDragRotationBehavior = function (parent, dragPoint, originPoint) {
    dragPoint
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            parent.rotation = AngleBetween(originPoint.x, originPoint.y, dragX, dragY) - RotationPointRotation;
        })
}

export default AddDragRotationBehavior;