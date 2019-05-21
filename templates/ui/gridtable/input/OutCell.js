import FireCellEvent from './FireCellEvent.js';

var OutCell = function (table) {
    table
        .on('pointerup', OnCellOut, this)
        .on('pointerout', OnCellOut, this);
}

var OnCellOut = function () {
    var table = this.childrenMap.child;
    var cellIndxe = this._lastOverCellIndex;
    this._lastOverCellIndex = undefined;
    FireCellEvent(this.eventEmitter, 'cell.out', table, cellIndxe);
}

export default OutCell;