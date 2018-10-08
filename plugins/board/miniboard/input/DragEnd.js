var DragEnd = function () {
    var dragData = this.input.drag;
    if (dragData.state !== 0) {
        var pointer = this.input.pointer;
        var dragStartPosition = dragData.startPosition;
        var dragX = pointer.x - dragStartPosition.x;
        var dragY = pointer.y - dragStartPosition.y;        
        dragData.state = 0;
        this.emit('dragend', pointer, dragX, dragY);
    }
    return this;
}
export default DragEnd;