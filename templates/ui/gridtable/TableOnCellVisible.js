var TableOnCellVisible = function (table) {
    table.on('cellvisible', function (cell, cellContainer, table) {
        var callback = this.createCellContainerCallback;
        var scope = this.createCellContainerCallbackScope;
        cell.item = this.items[cell.index];
        cell.items = this.items;
        cell.gridTable = this;
        var cellContainer;
        if (scope) {
            cellContainer = callback.call(scope, cell, cellContainer, this);
        } else {
            cellContainer = callback(cell, cellContainer, this);
        }

        if (cellContainer) {
            if (cell.cellContainerAlign == null) {
                if (cellContainer.isRexSizer && !cellContainer.dirty) {
                    cellContainer.changeOrigin(0); // Won't be layout later
                } else if (cellContainer.setOrigin) {
                    cellContainer.setOrigin(0);
                }

            }

            if (cellContainer.isRexSizer) {
                cellContainer.layout(); // Use original size
            }
        }

        cell.item = undefined;
        cell.items = undefined;
        cell.gridTable = undefined;
        cell.setContainer(cellContainer);
    }, this);
}
export default TableOnCellVisible;