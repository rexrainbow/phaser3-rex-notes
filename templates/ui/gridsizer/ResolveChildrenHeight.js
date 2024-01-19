var ResolveChildrenHeight = function (parentHeight) {
    // Resolve width of sizer children
    var child, expandedChildHeight, childHeight;
    var rowHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            rowHeight = this.getRowHeight(Math.floor(parseInt(i) / this.rowCount));
            expandedChildHeight = this.getExpandedChildHeight(child, rowHeight);
            childHeight = child.resolveHeight(expandedChildHeight);
            if (childHeight === undefined) {
                childHeight = expandedChildHeight;
            }
            child.resolveChildrenHeight(childHeight);
        }
    }
}

export default ResolveChildrenHeight;