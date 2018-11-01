var GetChildrenWidth = function () {
    if (!this.visible) {
        return 0;
    }

    var result = 0,
        columnWidth;
    var children = this.sizerChildren;
    var child, padding, childWidth, proportion;

    for (var i = 0; i < this.columnCount; i++) {
        columnWidth = 0;
        proportion = this.columnProportions[i];
        for (var j = 0; j < this.rowCount; j++) {
            child = children[(i * this.columnCount) + j];
            if (!child) {
                continue;
            }
            if (!child.visible) {
                continue;
            }

            if (proportion > 0) {
                childWidth = 0;
            } else {
                childWidth = (child.isRexSizer) ? child.childrenWidth : child.width;
            }
            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right);
            columnWidth = Math.max(columnWidth, childWidth);
        }
    }
    result = Math.max(result, this.minWidth);
    return result;
}

export default GetChildrenWidth;