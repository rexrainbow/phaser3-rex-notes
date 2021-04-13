var ResolveChildrenWidth = function (width) {
    // Resolve width of sizer children
    var children = this.getChildrenSizers(),
        child, childWidth;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            childWidth = this.getExpandedChildWidth(child, width);
            childWidth = child.resolveWidth(childWidth);
            child.resolveChildrenWidth(childWidth);
        }
    }
}

export default ResolveChildrenWidth;