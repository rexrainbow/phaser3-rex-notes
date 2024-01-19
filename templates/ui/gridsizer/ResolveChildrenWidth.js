var ResolveChildrenWidth = function (parentWidth) {
    // Resolve width of sizer children
    var child, expandedChildWidth, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
            expandedChildWidth = this.getExpandedChildWidth(child, colWidth);
            childWidth = child.resolveWidth(expandedChildWidth);
            if (childWidth === undefined) {
                childWidth = expandedChildWidth;
            }
            child.resolveChildrenWidth(childWidth);
        }
    }
}

export default ResolveChildrenWidth;