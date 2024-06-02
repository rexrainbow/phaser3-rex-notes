var AddDragMoveBehavior = function (parent, dragPoint) {
    dragPoint
        .setInteractive({ draggable: true })
        .on('dragstart', function () {
            parent.emit('move.start');
            parent.emit('control.start');
        })
        .on('dragend', function () {
            parent.emit('move.stop');
            parent.emit('control.stop');
        })
        .on('drag', function (pointer, dragX, dragY) {
            parent.x += dragX - dragPoint.x;
            parent.y += dragY - dragPoint.y;
        })
}

export default AddDragMoveBehavior;