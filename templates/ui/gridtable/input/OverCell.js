import EmitCellEvent from './EmitCellEvent.js';

var OverCell = function (table, tableConfig) {
    table
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this)  // pointer-up is included too
}

var OnMove = function (pointer) {
    var table = this.childrenMap.child;
    var cellIndex = table.pointToCellIndex(pointer.x, pointer.y);
    if (cellIndex === table.input.lastOverCellIndex) {
        return;
    }

    var preCellIndex = table.input.lastOverCellIndex;
    table.input.lastOverCellIndex = cellIndex;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, preCellIndex, undefined, pointer);
    EmitCellEvent(this.eventEmitter, 'cell.over', table, cellIndex, undefined, pointer);
}

var OnOut = function (pointer) {
    var table = this.childrenMap.child;
    var cellIndex = table.input.lastOverCellIndex;
    table.input.lastOverCellIndex = undefined;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, cellIndex, undefined, pointer);
}

export default OverCell;