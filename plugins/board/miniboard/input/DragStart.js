var OnDragStart = function (pointer) {
    var dragData = this.miniboardInput.drag;
    // Drag by another pointer
    if (dragData.state === 1) {
        return;
    }

    var dragPosition = dragData.position;
    dragPosition.x = pointer.x - this.x;
    dragPosition.y = pointer.y - this.y;
    dragData.state = 1;
    this.emit('dragstart', pointer, dragPosition.x, dragPosition.y);
}

export default OnDragStart;