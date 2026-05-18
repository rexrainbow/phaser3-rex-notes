var InstallCellInteractiveEvents = function(config?: any) {
    this
        .on('cell.click', function(cellContainer?: any, cellIndex?: any) {
            this.emit('select', cellContainer, cellIndex);
        }, this)
        .on('cell.over', function(cellContainer?: any, cellIndex?: any) {
            cellContainer.onOver();
        })
        .on('cell.out', function(cellContainer?: any, cellIndex?: any) {
            cellContainer.onOut();
        })
}

export default InstallCellInteractiveEvents;