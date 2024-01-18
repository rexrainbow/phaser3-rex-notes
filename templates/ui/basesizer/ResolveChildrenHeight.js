var ResolveChildrenHeight = function (parentHeight) {
    // Resolve width of sizer children
    var child, expandedChildHeight, childHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            expandedChildHeight = this.getExpandedChildHeight(child, parentHeight);
            childHeight = child.resolveHeight(expandedChildHeight);
            if (childHeight === undefined) {
                childHeight = expandedChildHeight;
            }
            child.resolveChildrenHeight(childHeight);
        }
    }
}

export default ResolveChildrenHeight;