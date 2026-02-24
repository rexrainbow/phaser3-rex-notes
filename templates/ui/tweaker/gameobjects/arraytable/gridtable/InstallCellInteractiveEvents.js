var InstallCellInteractiveEvents = function (config) {
    this
        .on('cell.over', function (cellContainer, cellIndex) {
            cellContainer.onOver();
        })
        .on('cell.out', function (cellContainer, cellIndex) {
            cellContainer.onOut();
        })
}

export default InstallCellInteractiveEvents;