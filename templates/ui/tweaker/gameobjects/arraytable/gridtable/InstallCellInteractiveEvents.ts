var InstallCellInteractiveEvents = function(config?: any) {
    this
        .on('cell.over', function(cellContainer?: any, cellIndex?: any) {
            cellContainer.onOver();
        })
        .on('cell.out', function(cellContainer?: any, cellIndex?: any) {
            cellContainer.onOut();
        })
}

export default InstallCellInteractiveEvents;