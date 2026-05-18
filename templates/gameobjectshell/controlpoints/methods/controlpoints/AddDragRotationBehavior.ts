import { Math as PhaserMath } from 'phaser';
const AngleBetween = PhaserMath.Angle.Between;

var AddDragRotationBehavior = function(parent?: any, dragPoint?: any, originPoint?: any) {
    dragPoint
        .setInteractive({ draggable: true })
        .on('dragstart', function() {
            parent.emit('rotate.start');
            parent.emit('control.start');
        })
        .on('dragend', function() {
            parent.emit('rotate.stop');
            parent.emit('control.stop');
        })
        .on('drag', function(pointer?: any, dragX?: any, dragY?: any) {
            parent.rotation = AngleBetween(originPoint.x, originPoint.y, dragX, dragY);
        })
}

export default AddDragRotationBehavior;