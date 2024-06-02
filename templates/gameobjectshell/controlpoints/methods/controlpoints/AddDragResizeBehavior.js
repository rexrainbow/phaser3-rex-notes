var AddDragResizeBehavior = function (parent, dragPoint, fixedPoint, dragAxis) {
    var canDragWidth = (dragAxis.indexOf('x') !== -1);
    var canDragHeight = (dragAxis.indexOf('y') !== -1);

    dragPoint
        .setInteractive({ draggable: true })
        .on('dragstart', function () {
            parent.emit('resize.start');
            parent.emit('control.start');
        })
        .on('dragend', function () {
            parent.emit('resize.stop');
            parent.emit('control.stop');
        })
        .on('drag', function (pointer, dragX, dragY) {
            var fixedX = fixedPoint.x,
                fixedY = fixedPoint.y;

            if (GlobalDragVector === undefined) {
                GlobalDragVector = new Phaser.Math.Vector2();
            }
            GlobalDragVector
                .setTo(dragX - fixedX, dragY - fixedY)
                .rotate(-parent.rotation)

            if (canDragWidth) {
                parent.width = Math.abs(GlobalDragVector.x);
            }
            if (canDragHeight) {
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