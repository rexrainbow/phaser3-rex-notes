var GetSize = function (gameObject, displayKey, sizeKey) {
    var size = gameObject[displayKey];
    if (size === undefined) {
        size = gameObject[sizeKey];
    }
    if ((typeof (size) !== 'number') || !isFinite(size) || (size <= 0)) {
        return null;
    }
    return Math.ceil(size);
}

var ResetCellSizeFromCell = function (cellIdx) {
    if (cellIdx === undefined) {
        cellIdx = 0;
    }

    if (this._isResetCellSizeFromCell) {
        return this;
    }
    this._isResetCellSizeFromCell = true;

    var cell = this.table.getCell(cellIdx, true);
    if (!cell) {
        this._isResetCellSizeFromCell = false;
        return this;
    }

    // Build a reference cell-container from current cell data.
    this.showCell(cell);

    var cellContainer = cell.getContainer();
    if (!cellContainer) {
        this._isResetCellSizeFromCell = false;
        return this;
    }

    var cellWidth = GetSize(cellContainer, 'displayWidth', 'width');
    var cellHeight = GetSize(cellContainer, 'displayHeight', 'height');

    // Remove temporary container before full refresh.
    this.hideCell(cell);

    if ((cellWidth !== null) && (cellHeight !== null)) {
        this.resetAllCellsSize(cellWidth, cellHeight);
    }

    this._isResetCellSizeFromCell = false;
    return this;
}

export default ResetCellSizeFromCell;
