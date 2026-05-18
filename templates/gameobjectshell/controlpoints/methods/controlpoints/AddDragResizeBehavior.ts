import { Math as PhaserMath } from 'phaser';
var AddDragResizeBehavior = function(parent?: any, dragPoint?: any, fixedPoint?: any, dragAxis?: any) {
    var canDragWidth = (dragAxis.indexOf('x') !== -1);
    var canDragHeight = (dragAxis.indexOf('y') !== -1);

    dragPoint
        .setInteractive({ draggable: true })
        .on('dragstart', function() {
            parent.emit('resize.start');
            parent.emit('control.start');
        })
        .on('dragend', function() {
            parent.emit('resize.stop');
            parent.emit('control.stop');
        })
        .on('drag', function(pointer?: any, dragX?: any, dragY?: any) {
            var fixedX = fixedPoint.x,
                fixedY = fixedPoint.y;

            if (GlobalDragVector === undefined) {
                GlobalDragVector = new PhaserMath.Vector2();
            }
            GlobalDragVector
                .setTo(dragX - fixedX, dragY - fixedY)
                .rotate(-parent.rotation)

            if (canDragWidth?: any) {
                parent.width = Math.abs(GlobalDragVector.x);
            }
            if (canDragHeight?: any) {
                parent.height = Math.abs(GlobalDragVector.y);
            }

            parent.layout();

            parent.x += fixedX - fixedPoint.x;
            parent.y += fixedY - fixedPoint.y;

            parent.setChildDisplaySize(parent.childrenMap.target, parent.width, parent.height);
        })
}

var GlobalDragVector;

export default AddDragResizeBehavior