var EmitCellEvent = function (eventEmitter, eventName, table, x, y) {
    var cellIndex;
    if (y === undefined) {
        cellIndex = x;
    } else {
        cellIndex = table.pointerToCellIndex(x, y);
    }
    if ((cellIndex === null) || (cellIndex === undefined)) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    eventEmitter.emit(eventName, cellContainer, cellIndex);
}

export default EmitCellEvent;