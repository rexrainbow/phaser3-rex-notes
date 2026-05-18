var RegisterDragEvents = function() {
    this.dragPointer = null;

    this
        .on('dragstart', function(pointer?: any, dragX?: any, dragY?: any) {
            this.dragPointer = pointer;
        }, this)
        .on('dragend', function(pointer?: any, dragX?: any, dragY?: any, dropped?: any) {
            this.dragPointer = null;
        }, this);
}

export default RegisterDragEvents;