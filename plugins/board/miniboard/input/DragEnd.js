var DragEnd = function (pointer) {
    var dragData = this.miniboardInput.drag;
    // Not dragging
    if (dragData.state === 0) {
        return;
    }

    if (pointer === undefined) {
        pointer = this.miniboardInput.pointer;
    }
    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    dragData.state = 0;
    this.emit('dragend', pointer, dragX, dragY);
    return this;
}
export default DragEnd;