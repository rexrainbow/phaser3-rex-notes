var ResolveChildrenHeight = function (parentHeight) {
    // Resolve width of sizer children
    var child, childHeight;
    var rowHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            rowHeight = this.getRowHeight(parseInt(i) % this.rowCount);
            childHeight = this.getExpandedChildHeight(child, rowHeight);
            childHeight = child.resolveHeight(childHeight);
            child.resolveChildrenHeight(childHeight);
        }
    }
}

export default ResolveChildrenHeight;