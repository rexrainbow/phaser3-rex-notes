import FireCellEvent from './FireCellEvent.js';

var OverCell = function (table) {
    table
        .on('pointermove', OnCellOver, this)
        .on('pointerover', OnCellOver, this);
}

var OnCellOver = function (pointer) {
    if (pointer.isDown) {
        return;
    }
    var table = this.childrenMap.child;
    var cellIndex = table.pointerToCellIndex(pointer.worldX, pointer.worldY);
    if (cellIndex === this._lastOverCellIndex) {
        return;
    }

    var preCellIndex = this._lastOverCellIndex;
    this._lastOverCellIndex = cellIndex;
    FireCellEvent(this.eventEmitter, 'cell.out', table, preCellIndex);
    FireCellEvent(this.eventEmitter, 'cell.over', table, cellIndex);
}

export default OverCell;