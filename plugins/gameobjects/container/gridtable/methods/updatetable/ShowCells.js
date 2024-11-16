import AlignIn from '../../../../../utils/actions/AlignIn.js';

var ShowCells = function () {
    if (this.cellsCount === 0) {
        return;
    }

    // Save scale
    var scaleXSave = this.scaleX;
    var scaleYSave = this.scaleY;
    var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
    if (!scale1) {
        this.setScale(1);
    }

    var table = this.table;

    var tableOYOffset = this.tableOYOffset;
    var tableOY = this.tableOY + tableOYOffset,
        tableOX = this.tableOX;

    this.startRowIndex = Math.max(table.heightToRowIndex(-tableOY, 2), 0);
    var rowIndex = this.startRowIndex;

    var startColumnIndex = Math.max(table.widthToColIndex(-tableOX), 0);
    var columnIndex = startColumnIndex;

    var cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;

    var startCellTLX = this.getCellTLX(columnIndex),
        cellTLX = startCellTLX;
    var startCellTLY = this.getCellTLY(rowIndex) + tableOYOffset,
        cellTLY = startCellTLY;
    while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
        if (this.table.isValidCellIdx(cellIdx)) {
            var cell = table.getCell(cellIdx, true);
            this.visibleCells.set(cell);
            if (!this.preVisibleCells.contains(cell)) {
                this.showCell(cell);
            }

            var x, y;
            if (this.scrollMode === 0) {
                x = cellTLX;
                y = cellTLY;
            } else {
                x = cellTLY;
                y = cellTLX;
            }
            if (cell.cellContainerAlign == null) {
                cell.setXY(x, y);
            } else {
                var cellContainer = cell.getContainer();
                AlignIn(cellContainer, x, y, cell.width, cell.height, cell.cellContainerAlign);
                cell.setXY(cellContainer.x, cellContainer.y);
            }
        }

        if ((cellTLX < rightBound) && (columnIndex < lastColIdx)) {
            cellTLX += table.getColWidth(columnIndex);
            columnIndex += 1;
        } else {
            cellTLX = startCellTLX;
            cellTLY += table.getRowHeight(rowIndex);

            columnIndex = startColumnIndex;
            rowIndex += 1;
        }

        cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    }

    // Restore scale
    if (!scale1) {
        this.setScale(scaleXSave, scaleYSave);
    }
}

export default ShowCells;