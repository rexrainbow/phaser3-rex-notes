var RunWidthWrap = function (width) {
    var child, expandedChildWidth, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runWidthWrap)
        ) {
            continue;
        }

        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        expandedChildWidth = this.getExpandedChildWidth(child, colWidth);
        if (child.isRexSizer) {
            childWidth = child.resolveWidth(expandedChildWidth);
            if (childWidth === undefined) {
                childWidth = expandedChildWidth;
            }
        }
        child.runWidthWrap(childWidth);
    }
    return this;
}

export default RunWidthWrap;