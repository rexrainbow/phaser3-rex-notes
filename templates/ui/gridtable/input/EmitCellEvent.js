var EmitCellEvent = function (eventEmitter, eventName, table, worldX, worldY, pointer, event) {
    var cellIndex;
    if (worldY === undefined) {
        cellIndex = worldX;
    } else {
        var camera = pointer.camera;
        var px = worldX + camera.scrollX * (table.scrollFactorX - 1);
        var py = worldY + camera.scrollY * (table.scrollFactorY - 1);
        cellIndex = table.pointToCellIndex(px, py);

    }
    if ((cellIndex === null) || (cellIndex === undefined)) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    if (cellContainer) {
        eventEmitter.emit(eventName, cellContainer, cellIndex, pointer, event);
    }
}

export default EmitCellEvent;