var SetGridSize = function(colCount?: any, rowCount?: any) {
    this.setCellsCount(colCount * rowCount);
    this.table.setColumnCount(colCount);
    return this;
}

export default SetGridSize;