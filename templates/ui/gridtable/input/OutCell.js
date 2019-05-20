var OutCell = function (table) {
    table
        .on('pointerup', OnCellOut, this)
        .on('pointerout', OnCellOut, this);
}

var OnCellOut = function () {
    var table = this.childrenMap.child;
    var cellContainer = table.getCellContainer(this.lastOverCellIndex);
    if (cellContainer != null) {
        this.eventEmitter.emit('cell.out', cellContainer, this.lastOverCellIndex);
    }
    this.lastOverCellIndex = undefined;
}

export default OutCell;