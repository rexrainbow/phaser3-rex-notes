var AddDragResizeBehavior = function (parent, dragger, basePosition, dragAxis) {
    var canDragWidth = (dragAxis.indexOf('x') !== -1);
    var canDragHeight = (dragAxis.indexOf('y') !== -1);

    dragger
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            var baseX = basePosition.x,
                baseY = basePosition.y;

            if (GlobalDragVector === undefined) {
                GlobalDragVector = new Phaser.Math.Vector2()
            }
            GlobalDragVector
                .setTo(dragX - baseX, dragY - baseY)
                .rotate(-parent.rotation)

            if (canDragWidth) {
                parent.width = Math.abs(GlobalDragVector.x);
            }
            if (canDragHeight) {
                parent.height = Math.abs(GlobalDragVector.y);
            }

            parent.updateChildren();

            parent.x += baseX - basePosition.x;
            parent.y += baseY - basePosition.y;

            parent.setChildDisplaySize(parent.target, parent.width, parent.height);
        })
}

var GlobalDragVector;

export default AddDragResizeBehavior