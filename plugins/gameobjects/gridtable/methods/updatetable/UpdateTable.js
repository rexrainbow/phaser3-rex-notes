import HideCells from './HideCells.js';
import ShowCells from './ShowCells.js';

var UpdateTable = function (refresh) {
    if (refresh === undefined) {
        refresh = false;
    }
    if (refresh) {
        ClearVisibleCellIndexes.call(this);
        HideCells.call(this);
    }
    ClearVisibleCellIndexes.call(this);
    ShowCells.call(this);
    HideCells.call(this);

    this.maskCellsFlag = true;
    return this;
}

var ClearVisibleCellIndexes = function () {
    var tmp = this.preVisibleCells;
    this.preVisibleCells = this.visibleCells;
    this.visibleCells = tmp;
    this.visibleCells.clear();
}

export default UpdateTable;