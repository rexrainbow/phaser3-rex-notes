var SetDraggable = function (draggable) {
    if (draggable === undefined) {
        draggable = true;
    }

    if (this.input && this.input.hasOwnProperty('draggable')) {
        // Draggable is already registered
        this.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.on('drag', onDrag, this);
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}

var onDrag = function (pointer, dragX, dragY) {
    var topmostParent = this.getTopmostSizer();
    topmostParent.x += (dragX - this.x);
    topmostParent.y += (dragY - this.y);
}

export default SetDraggable;