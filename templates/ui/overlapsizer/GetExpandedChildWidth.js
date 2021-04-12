var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandWidth) {
        var innerWidth = parentWidth - this.space.left - this.space.right;
        childWidth = innerWidth - padding.left - padding.right;
    } else {
        childWidth = child.width;
    }
    return childWidth;
}

export default GetExpandedChildWidth;