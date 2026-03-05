var InstallCellInteractiveEvents = function (config) {
    this
        .on('cell.click', function (cellContainer, cellIndex) {
            this.emit('select', cellContainer, cellIndex);
        }, this)
        .on('cell.over', function (cellContainer, cellIndex) {
            cellContainer.onOver();
        })
        .on('cell.out', function (cellContainer, cellIndex) {
            cellContainer.onOut();
        })
}

export default InstallCellInteractiveEvents;
