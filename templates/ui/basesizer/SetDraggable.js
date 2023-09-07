var SetDraggable = function (senser, draggable, dragTarget) {
    var senserType = typeof (senser);
    if (senserType === 'string') {
        var senserName = senser;
        senser = this.getElement(senserName);
        if (!senser) {
            console.error(`Can get element '${senserName}'`);
            return this;
        }
    } else if ((senser === undefined) || (senserType != 'object')) {
        draggable = senser;
        senser = this;
    }

    if (typeof (draggable) !== 'boolean') {
        dragTarget = draggable;
        draggable = undefined;
    }

    if (draggable === undefined) {
        draggable = true;
    }

    if (senser.input && senser.input._rexUIDragSizer) {
        // Draggable is already registered
        senser.input.draggable = draggable;
    } else if (draggable) {
        // Register draggable
        senser.setInteractive();
        senser.scene.input.setDraggable(senser);
        senser
            .on('drag', function (pointer, dragX, dragY) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.x += (dragX - senser.x);
                currentDragTarget.y += (dragY - senser.y);
                currentDragTarget.emit('sizer.drag', pointer, dragX, dragY);
            }, this)
            .on('dragstart', function (pointer, dragX, dragY) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.emit('sizer.dragstart', pointer, dragX, dragY);
            }, this)
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                currentDragTarget.emit('sizer.dragend', pointer, dragX, dragY, dropped);
            }, this)
        senser.input._rexUIDragSizer = true;
    } else {
        // Not draggable and draggable is not registered yet, do nothing
    }
    return this;
}

export default SetDraggable;