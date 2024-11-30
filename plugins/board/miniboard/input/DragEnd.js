var DragEnd = function () {
    if (!this.dragPointer) {
        return;
    }
    this.scene.input.setDragState(this.dragPointer, 5);
    return this;
}

export default DragEnd;