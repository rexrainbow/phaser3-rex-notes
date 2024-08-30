var EmitCellEvent = function (eventEmitter, eventName, table, x, y, pointer, event) {
    var cellIndex;
    if (y === undefined) {
        cellIndex = x;
    } else {
        var camera = pointer.camera;
        var px = x + camera.scrollX * (table.scrollFactorX - 1);
        var py = y + camera.scrollY * (table.scrollFactorY - 1);
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