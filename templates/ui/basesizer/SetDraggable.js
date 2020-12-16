var SetDraggable = function (senser, draggable) {
    var senserType = typeof (senser);
    if (senserType === 'string') {
        senser = this.getElement(senser);
    } else if ((senser === undefined) || (senserType != 'object')) {
        draggable = senser;
        senser = this;
    }
    if (draggable === undefined) {
        draggable = true;
    }

    if (senser.input && senser.input.hasOwnProperty('draggable')) {
        // Draggable is already registered
        senser.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        senser.setInteractive();
        senser.scene.input.setDraggable(senser);
        senser.on('drag', function (pointer, dragX, dragY) {
            var topmostParent = this.getTopmostSizer();
            topmostParent.x += (dragX - senser.x);
            topmostParent.y += (dragY - senser.y);
        }, this);
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}

export default SetDraggable;