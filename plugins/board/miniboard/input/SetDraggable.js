var SetDraggable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    this.setInteractive();
    this.miniboardInput.drag.enable = enable;
    if (!enable) {
        this.miniboardInput.drag.state = 0;
    }
    return this;
}
export default SetDraggable;