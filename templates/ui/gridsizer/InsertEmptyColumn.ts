var InsertEmptyColumn = function(colIndex?: any, proportion?: any, space?: any) {
    if (proportion === undefined) {
        proportion = this.columnProportions[0] || 0;
    }
    if (space === undefined) {
        space = this.space.column0 || 0;
    }

    this.columnCount += 1;
    this.gridCount += this.rowCount;

    for (var i = this.rowCount - 1; i >= 0; i--) {
        var insertIndex = (i * this.columnCount) + colIndex;
        this.sizerChildren.splice(insertIndex, 0, null);
    }

    this.columnProportions.push(proportion);

    this.columnWidth.length += 1;  // this.columnWidth will be recalculated when layout()    

    this.space.column.splice(colIndex, 0, space);

    return this;
}

var AddEmptyColumn = function(proportion?: any, space?: any) {
    InsertEmptyColumn.call(this, this.columnCount, proportion, space);
    return this;
}

export {
    InsertEmptyColumn,
    AddEmptyColumn
};