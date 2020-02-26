import HideCell from './HideCell.js';

var HideCells = function () {
    var preList = this.preVisibleCells;
    var curList = this.visibleCells;
    preList.iterate(function (cell) {
        if (!curList.contains(cell)) {
            HideCell.call(this, cell);
        }
    }, this);
}

export default HideCells;