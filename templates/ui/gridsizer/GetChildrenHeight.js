var GetChildrenHeight = function () {
    if (!this.visible) {
        return 0;
    }

    var result = 0,
        rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;

    for (var i = 0; i < this.rowCount; i++) {
        rowHeight = 0;
        proportion = this.rowProportions[i];
        for (var j = 0; j < this.columnCount; j++) {
            child = children[(j * this.columnCount) + i];
            if (!child) {
                continue;
            }
            if (!child.visible) {
                continue;
            }

            if (proportion > 0) {
                childHeight = 0;
            } else {
                childHeight = (child.isRexSizer) ? child.childrenHeight : child.height;
            }
            padding = child.rexSizer.padding;
            childHeight += (padding.top + padding.bottom);
            rowHeight = Math.max(rowHeight, childHeight);
        }
    }
    result = Math.max(result, this.minHeight);
    return result;
}

export default GetChildrenHeight;