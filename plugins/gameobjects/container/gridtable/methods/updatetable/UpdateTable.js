var UpdateTable = function (refresh, maskChildren) {
    if (refresh === undefined) {
        refresh = false;
    }
    if (maskChildren === undefined) {
        maskChildren = false;
    }

    if (refresh) {
        ClearVisibleCellIndexes.call(this);
        this.hideCells();
    }
    ClearVisibleCellIndexes.call(this);
    this.showCells();
    this.hideCells();

    this.setMaskChildrenFlag();

    if (maskChildren) {
        // Layout children-mask
        this.layoutChildrenMask();
        // Re-mask children
        this.maskChildren();
    }

    return this;
}

var ClearVisibleCellIndexes = function () {
    var tmp = this.preVisibleCells;
    this.preVisibleCells = this.visibleCells;
    this.visibleCells = tmp;
    this.visibleCells.clear();
}

export default UpdateTable;