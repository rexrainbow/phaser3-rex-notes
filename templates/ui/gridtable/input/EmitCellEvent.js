import PointerToCellIndex from './PointerToCellIndex.js';

var EmitCellEvent = function (eventEmitter, eventName, table, worldX, worldY, pointer, event) {
    var cellIndex = null;
    if (worldY === undefined) {
        cellIndex = worldX;
    } else {
        cellIndex = PointerToCellIndex(table, pointer, worldX, worldY);

    }
    if (cellIndex === null) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    if (cellContainer) {
        eventEmitter.emit(eventName, cellContainer, cellIndex, pointer, event);
    }
}

export default EmitCellEvent;