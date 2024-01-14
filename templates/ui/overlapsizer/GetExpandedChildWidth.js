var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;
    if (childConfig.expandWidth) {
        var space = this.space;
        var innerWidth = parentWidth - space.left - space.right;
        var padding = childConfig.padding;
        childWidth = innerWidth - padding.left - padding.right;
    }
    return childWidth;
}

export default GetExpandedChildWidth;