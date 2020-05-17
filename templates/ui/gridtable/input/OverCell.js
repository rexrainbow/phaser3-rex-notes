import EmitCellEvent from './EmitCellEvent.js';

var OverCell = function (table, tableConfig) {
    table
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this);
}

var OnMove = function (pointer) {
    if (pointer.isDown) {
        return;
    }
    var table = this.childrenMap.child;
    var cellIndex = table.pointToCellIndex(pointer.x, pointer.y);
    if (cellIndex === this._lastOverCellIndex) {
        return;
    }

    var preCellIndex = this._lastOverCellIndex;
    this._lastOverCellIndex = cellIndex;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, preCellIndex, undefined, pointer);
    EmitCellEvent(this.eventEmitter, 'cell.over', table, cellIndex, undefined, pointer);
}

var OnOut = function (pointer) {
    var table = this.childrenMap.child;
    var cellIndex = this._lastOverCellIndex;
    this._lastOverCellIndex = undefined;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, cellIndex, undefined, pointer);
}

export default OverCell;