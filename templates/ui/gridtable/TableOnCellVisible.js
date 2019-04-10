var TableOnCellVisible = function (table) {
    table.on('cellvisible', function (cell) {
        var callback = this.createCellContainerCallback;
        var scope = this.createCellContainerCallbackScope;
        cell.item = this.items[cell.index];
        var container;
        if (scope) {
            container = callback.call(scope, cell);
        } else {
            container = callback(cell);
        }
        if (container.setOrigin) {
            container.setOrigin(0);
        }
        if (container.isRexSizer) {
            container.layout(); // Use original size
        }

        cell.item = undefined;
        cell.setContainer(container);
    }, this);
}
export default TableOnCellVisible;