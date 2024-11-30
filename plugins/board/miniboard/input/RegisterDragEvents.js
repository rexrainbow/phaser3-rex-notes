var RegisterDragEvents = function () {
    this.dragPointer = null;

    this
        .on('dragstart', function (pointer, dragX, dragY) {
            this.dragPointer = pointer;
        }, this)
        .on('dragend', function (pointer, dragX, dragY, dropped) {
            this.dragPointer = null;
        }, this);
}

export default RegisterDragEvents;