var AddDragMoveBehavior = function (parent, dragPoint) {
    dragPoint
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            parent.x += dragX - dragPoint.x;
            parent.y += dragY - dragPoint.y;
        })
}

export default AddDragMoveBehavior;