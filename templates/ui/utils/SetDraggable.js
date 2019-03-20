var SetDraggable = function (draggable) {
    if (draggable === undefined) {
        draggable = true;
    }

    var config = this.rexSizer
    if (draggable) {
        if (!config.hasOwnProperty('draggable')) {
            this.setInteractive(interactiveConfig);
            this.scene.input.setDraggable(this);
            this.on('drag', onDrag, this);
        }
        config.draggable = true;
    } else { // !draggable
        if (config.hasOwnProperty('draggable')) {
            config.draggable = false;
            this.input.draggable = false;
        }
    }
    return this;
}

var onDrag = function (pointer, dragX, dragY) {
    var topmostParent = this.getTopmostSizer();
    topmostParent.x += (dragX - this.x);
    topmostParent.y += (dragY - this.y);
}

var interactiveConfig = {
    draggable: true
}

export default SetDraggable;