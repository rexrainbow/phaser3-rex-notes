var TableOnCellVisible = function (table) {
    table.on('cellvisible', function (cell, cellContainer, table) {
        var callback = this.createCellContainerCallback;
        var scope = this.createCellContainerCallbackScope;
        cell.item = this.items[cell.index];
        var cellContainer;
        if (scope) {
            cellContainer = callback.call(scope, cell, cellContainer, table);
        } else {
            cellContainer = callback(cell, cellContainer, table);
        }
        if (cellContainer) {
            if (cellContainer.setOrigin) {
                cellContainer.setOrigin(0);
            }
            if (cellContainer.isRexSizer) {
                cellContainer.layout(); // Use original size
            }
        }

        cell.item = undefined;
        cell.setContainer(cellContainer);
    }, this);
}
export default TableOnCellVisible;