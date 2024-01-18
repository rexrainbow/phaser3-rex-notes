var ResolveChildrenWidth = function (parentWidth) {
    // Resolve width of sizer children
    var child, expandedChildWidth, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            expandedChildWidth = this.getExpandedChildWidth(child, parentWidth);
            childWidth = child.resolveWidth(expandedChildWidth);
            if (childWidth === undefined) {
                childWidth = expandedChildWidth;
            }
            child.resolveChildrenWidth(childWidth);
        }
    }
}

export default ResolveChildrenWidth;