var ResolveChildrenHeight = function (parentHeight) {
    // Resolve width of sizer children
    var child, childHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            childHeight = this.getExpandedChildHeight(child, parentHeight);
            childHeight = child.resolveHeight(childHeight);
            child.resolveChildrenHeight(childHeight);
        }
    }
}

export default ResolveChildrenHeight;