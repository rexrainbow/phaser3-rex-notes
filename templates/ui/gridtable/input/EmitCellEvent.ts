import PointerToCellIndex from './PointerToCellIndex';

var EmitCellEvent = function(eventEmitter?: any, eventName?: any, table?: any, worldX?: any, worldY?: any, pointer?: any, event?: any) {
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
    if (cellContainer?: any) {
        eventEmitter.emit(eventName, cellContainer, cellIndex, pointer, event);
    }
}

export default EmitCellEvent;