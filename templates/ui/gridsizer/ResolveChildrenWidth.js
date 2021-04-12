var ResolveChildrenWidth = function (width) {
    // Resolve width of sizer children
    var child, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (!child) {
            continue;
        }
        
        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        if (child.isRexSizer) {
            childWidth = this.getExpandedChildWidth(child, colWidth);
            child.resolveWidth(this, childWidth);
        }
    }
}

export default ResolveChildrenWidth;