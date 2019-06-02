import EmitCellEvent from './EmitCellEvent.js';

var OverCell = function (table) {
    table
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerup', OnOut, this)
        .on('pointerout', OnOut, this);
}

var OnMove = function (pointer) {
    if (pointer.isDown) {
        return;
    }
    var table = this.childrenMap.child;
    var cellIndex = table.pointerToCellIndex(pointer.x, pointer.y);
    if (cellIndex === this._lastOverCellIndex) {
        return;
    }

    var preCellIndex = this._lastOverCellIndex;
    this._lastOverCellIndex = cellIndex;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, preCellIndex);
    EmitCellEvent(this.eventEmitter, 'cell.over', table, cellIndex);
}

var OnOut = function () {
    var table = this.childrenMap.child;
    var cellIndxe = this._lastOverCellIndex;
    this._lastOverCellIndex = undefined;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, cellIndxe);
}

export default OverCell;