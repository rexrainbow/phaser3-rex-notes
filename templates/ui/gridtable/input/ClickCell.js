var ClickCell = function (table) {
    table
        .on('pointerdown', OnCellClickPrepare, this)
        .on('pointermove', OnCellClickCancel, this)
        .on('pointerup', OnCellClick, this)
}

var OnCellClickPrepare = function (pointer, localX, localY, event) {
    this._clickCellState = true;
}

var OnCellClickCancel = function (pointer, localX, localY, event) {
    if (this._clickCellState) {
        if (pointer.getDistance() > 10) {
            this._clickCellState = false;
        }
    }
}

var OnCellClick = function (pointer, localX, localY, event) {
    if (!this._clickCellState) {
        return;
    }
    var table = this.childrenMap.child;
    var cellIndex = table.pointerToCellIndex(pointer.worldX, pointer.worldY);
    if (cellIndex === null) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    this.eventEmitter.emit('cell.click', cellContainer, cellIndex);
}

export default ClickCell;