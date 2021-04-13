var ResolveChildrenWidth = function (width) {
    // Resolve width of sizer children
    var child, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child.isRexSizer) {
            childWidth = this.getExpandedChildWidth(child, width);
            childWidth = child.resolveWidth(childWidth);
            child.resolveChildrenWidth(childWidth);
        }
    }
}

export default ResolveChildrenWidth;