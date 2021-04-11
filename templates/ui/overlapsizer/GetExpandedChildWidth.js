var GetExpandedChildWidth = function (child) {
    var childWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandWidth) {
        childWidth = this.innerWidth - padding.left - padding.right;
    }
    return childWidth;
}

export default GetExpandedChildWidth;