var FireCellEvent = function (eventEmitter, eventName, table, worldX, worldY) {
    var cellIndex;
    if (worldY === undefined) {
        cellIndex = worldX;
    } else {
        cellIndex = table.pointerToCellIndex(worldX, worldY);
    }
    if ((cellIndex === null) || (cellIndex === undefined)) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    eventEmitter.emit(eventName, cellContainer, cellIndex);
}

export default FireCellEvent;