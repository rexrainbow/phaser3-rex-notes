var ResolveChildrenHeight = function (parentHeight) {
    // Resolve width of sizer children
    var child, expandedChildHeight, childHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            if (parentHeight !== undefined) {
                // Normal case
                expandedChildHeight = this.getExpandedChildHeight(child, parentHeight);
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
                child.resolveChildrenHeight(childHeight);

            } else if (child.minHeight > 0) {
                // Child has minHeight
                child.resolveChildrenHeight(child.minHeight);
            }


        }
    }
}

export default ResolveChildrenHeight;