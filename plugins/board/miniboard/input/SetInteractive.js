var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    if (!this.input) {
        this.input = {
            enable: true,
            tilePosition: {
                x: undefined,
                y: undefined
            },
            pointer: undefined,
            drag: {
                enable: false,
                state: 0,
                position: {
                    x: undefined,
                    y: undefined
                }
            }
        };
        this.scene.input.on('pointerdown', onPointerDown, this);
        this.scene.input.on('pointerup', onPointerUp, this);
        this.scene.input.on('pointermove', onPointerMove, this);

        this.on('destroy', function () {
            this.scene.input.off('pointerdown', onPointerDown, this);
            this.scene.input.off('pointerup', onPointerUp, this);
            this.scene.input.off('pointermove', onPointerMove, this);
        }, this);
    }

    this.input.enable = enable;
    if (!enable) {
        this.input.pointer = null;
    }
    return this;
};

var onPointerDown = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }
    if (!this.isOverlappingPoint(pointer.x, pointer.y)) {
        return;
    }
    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }
    var dragData = this.input.drag;
    if (dragData.state === 0) {
        var dragPosition = dragData.position;
        dragPosition.x = pointer.x - this.x;
        dragPosition.y = pointer.y - this.y;
        dragData.state = 1;
        this.emit('dragstart', pointer, dragPosition.x, dragPosition.y);
    }
}
var onPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    if (this.input.pointer === pointer) { // Release touch pointer
        this.input.pointer = null;
    }
    var dragData = this.input.drag;
    if (dragData.state === 1) {
        var dragPosition = dragData.position;
        var dragX = pointer.x - dragPosition.x;
        var dragY = pointer.y - dragPosition.y;
        dragData.state = 0;
        this.emit('dragend', pointer, dragX, dragY);
    }
}

var onPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    var dragData = this.input.drag;
    if (dragData.state === 0) {
        if (!this.isOverlappingPoint(pointer.x, pointer.y)) {
            if (this.input.pointer === pointer) { // Release touch pointer
                this.input.pointer = null;
            }
            return;
        }

        if (this.input.pointer === null) { // Catch new touch pointer
            this.input.pointer = pointer;
        }

    } else { // On dragging
        var dragPosition = dragData.position;
        var dragX = pointer.x - dragPosition.x;
        var dragY = pointer.y - dragPosition.y;
        this.emit('drag', pointer, dragX, dragY);
    }
}
export default SetInteractive;