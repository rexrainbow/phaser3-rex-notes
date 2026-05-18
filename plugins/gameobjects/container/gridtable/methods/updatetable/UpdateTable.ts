var UpdateTable = function(refresh?: any, maskChildren?: any) {
    if (refresh === undefined) {
        refresh = false;
    }
    if (maskChildren === undefined) {
        maskChildren = false;
    }

    if (refresh?: any) {
        ClearVisibleCellIndexes.call(this);
        this.hideCells();
    }
    ClearVisibleCellIndexes.call(this);
    this.showCells();
    this.hideCells();

    this.setMaskChildrenFlag();

    if (maskChildren?: any) {
        // Layout children-mask
        this.layoutChildrenMask();
        // Re-mask children
        this.maskChildren();
    }

    return this;
}

var ClearVisibleCellIndexes = function() {
    var tmp = this.preVisibleCells;
    this.preVisibleCells = this.visibleCells;
    this.visibleCells = tmp;
    this.visibleCells.clear();
}

export default UpdateTable;