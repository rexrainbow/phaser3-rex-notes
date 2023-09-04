const AngleBetween = Phaser.Math.Angle.Between;

var AddDragRotationBehavior = function (parent, dragPoint, originPoint) {
    dragPoint
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            parent.rotation = AngleBetween(originPoint.x, originPoint.y, dragX, dragY);
        })
}

export default AddDragRotationBehavior;