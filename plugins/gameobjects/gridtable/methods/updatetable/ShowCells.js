import ShowCell from './ShowCell.js';

var ShowCells = function () {
    if (this.cellsCount === 0) {
        return;
    }
    var table = this.table;
    var rowIdx = table.heightToRowIndex(-this.tableOY);
    if (rowIdx < 0) {
        rowIdx = 0;
    }

    var colIdx = table.widthToColIndex(-this.tableOX);
    if (colIdx < 0) {
        colIdx = 0;
    }

    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;

    var cellTLX0 = GetCellTLX.call(this, colIdx),
        cellTLX = cellTLX0;
    var cellTLY = GetCellTLY.call(this, rowIdx);
    this.visibleStartY = null;
    this.visibleEndY = null;
    this.visibleStartX = null;
    this.visibleEndX = null;
    this.lastVisibleCellIdx = null;
    while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
        if (this.table.isValidCellIdx(cellIdx)) {
            if (this.visibleStartY === null) {
                this.visibleStartY = rowIdx;
                this.visibleEndY = rowIdx;
            }
            if (this.visibleStartX === null) {
                this.visibleStartX = colIdx;
                this.visibleEndX = colIdx;
            }

            if (this.lastVisibleCellIdx === null) {
                this.lastVisibleCellIdx = cellIdx;
            }

            if (this.visibleEndY < rowIdx) {
                this.visibleEndY = rowIdx;
            }

            if (this.visibleEndX < colIdx) {
                this.visibleEndX = colIdx;
            }

            if (this.lastVisibleCellIdx < cellIdx) {
                this.lastVisibleCellIdx = cellIdx;
            }

            var cell = table.getCell(cellIdx, true);
            this.visibleCells.set(cell);
            if (!this.preVisibleCells.contains(cell)) {
                ShowCell.call(this, cell);
            }
            if (this.scrollMode === 0) {
                cell.setXY(cellTLX, cellTLY);
            } else {
                cell.setXY(cellTLY, cellTLX);
            }
        }

        if ((cellTLX < rightBound) && (colIdx < lastColIdx)) {
            cellTLX += table.getColWidth(colIdx);
            colIdx += 1;
        } else {
            cellTLX = cellTLX0;
            cellTLY += table.getRowHeight(rowIdx);

            colIdx = this.visibleStartX;
            rowIdx += 1;
        }

        cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    }
}

var GetCellTLX = function (colIdx) {
    var ox = (this.scrollMode === 0) ? this.topLeftX : this.topLeftY;
    var x = this.tableOX + this.table.colIndexToWidth(0, colIdx - 1) + ox;
    return x;
}

var GetCellTLY = function (rowIdx) {
    var oy = (this.scrollMode === 0) ? this.topLeftY : this.topLeftX;
    var y = this.tableOY + this.table.rowIndexToHeight(0, rowIdx - 1) + oy;
    return y;
}

export default ShowCells;