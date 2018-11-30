var TableSetInteractive = function (table) {
    table
        .setInteractive()
        // Click event
        .on('pointerdown', OnCellClickPrepare, this)
        .on('pointermove', OnCellClickCancel, this)
        .on('pointerup', OnCellClick, this)
        // Over, out event
        .on('pointermove', OnCellOver, this)
        .on('pointerup', OnCellOut, this)
        .on('pointerover', OnCellOver, this)
        .on('pointerout', OnCellOut, this)
}

var OnCellClickPrepare = function () {
    this.clickCellState = true;
}

var OnCellClickCancel = function () {
    this.clickCellState = false;
}

var OnCellClick = function (pointer) {
    if (!this.clickCellState) {
        return;
    }
    var table = this.childrenMap.table;
    var cellIndex = table.pointerToCellIndex(pointer.worldX, pointer.worldY);
    if (cellIndex === null) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    this.eventEmitter.emit('cell.click', cellContainer, cellIndex);
}

var OnCellOver = function (pointer) {
    if (pointer.isDown) {
        return;
    }
    var table = this.childrenMap.table;
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

var OnCellOut = function () {
    var table = this.childrenMap.table;
    var cellContainer = table.getCellContainer(this.lastOverCellIndex);
    if (cellContainer != null) {
        this.eventEmitter.emit('cell.out', cellContainer, this.lastOverCellIndex);
    }
    this.lastOverCellIndex = undefined;
}

export default TableSetInteractive;