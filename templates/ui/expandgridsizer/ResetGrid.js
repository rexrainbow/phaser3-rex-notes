import ArrayFill from '../../../plugins/utils/array/Fill.js';

var ResetGrid = function (columnCount, rowCount) {
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.gridCount = columnCount * rowCount;

    // children
    if (this.sizerChildren === undefined) {
        this.sizerChildren = [];
    } else {
        this.removeAll();
    }

    if (this.indexesChildren === undefined) {
        this.indexesChildren = [];
    }
    this.indexesChildren.length = columnCount * rowCount;
    ArrayFill(this.indexesChildren, null);

    return this;
}

export default ResetGrid;