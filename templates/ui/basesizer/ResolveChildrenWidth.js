var ResolveChildrenWidth = function (parentWidth) {
    // Resolve width of sizer children
    var child, expandedChildWidth, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            if (parentWidth !== undefined) {
                // Normal case
                expandedChildWidth = this.getExpandedChildWidth(child, parentWidth);
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
                child.resolveChildrenWidth(childWidth);

            } else if (child.minWidth > 0) {
                // Child has minWidth
                child.resolveChildrenWidth(child.minWidth);
            }
        }
    }
}

export default ResolveChildrenWidth;