// Default method
var RunWidthWrap = function (width) {
    var child, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (!child) {
            continue;
        }

        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        if (childWidth === undefined) {
            childWidth = this.resolveWidth(childWidth);
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
    return this;
}

export default RunWidthWrap;