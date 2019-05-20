var OverCell = function (table) {
    table
        .on('pointermove', OnCellOver, this)
        .on('pointerover', OnCellOver, this);
}

var OnCellOver = function (pointer) {
    if (pointer.isDown) {
        return;
    }
    var table = this.childrenMap.child;
    var cellIndex = table.pointerToCellIndex(pointer.worldX, pointer.worldY);
    if (cellIndex === this.lastOverCellIndex) {
        return;
    }
    var cellContainer;
    if (this.lastOverCellIndex !== undefined) {
        cellContainer = table.getCellContainer(this.lastOverCellIndex);
        if (cellContainer != null) {
            this.eventEmitter.emit('cell.out', cellContainer, this.lastOverCellIndex);
        }
    }
    cellContainer = table.getCellContainer(cellIndex);
    if (cellContainer != null) {
        this.eventEmitter.emit('cell.over', cellContainer, cellIndex);
    }
    this.lastOverCellIndex = cellIndex;
}

export default OverCell;