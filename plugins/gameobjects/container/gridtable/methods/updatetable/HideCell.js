var HideCell = function (cell) {
    // Option: pop container of cell by cell.popContainer() under this event 
    this.emit('cellinvisible', cell);

    if (this.cellContainersPool) {
        var cellContainer = cell.popContainer(); // null if already been removed
        if (cellContainer) {
            cellContainer.setScale(1).setAlpha(1);
            this.cellContainersPool.killAndHide(cellContainer);
        }
    }

    cell.destroyContainer(); // Destroy container of cell
}

export default HideCell;