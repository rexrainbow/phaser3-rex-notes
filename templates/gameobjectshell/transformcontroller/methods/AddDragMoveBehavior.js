var AddDragMoveBehavior = function (parent, dragger) {
    dragger
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            parent.x += dragX - dragger.x;
            parent.y += dragY - dragger.y;
        })
}

export default AddDragMoveBehavior;