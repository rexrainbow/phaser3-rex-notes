var SetDraggable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.setInteractive({ draggable: true });
    this.input.draggable = enable;
    return this;
}
export default SetDraggable;