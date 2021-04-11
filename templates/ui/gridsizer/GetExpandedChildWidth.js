var GetExpandedChildWidth = function (child, colWidth) {
    var childWidth;
    var childConfig = child.rexSizer;
    if (childConfig.expand) {
        var padding = childConfig.padding;
        childWidth = colWidth - padding.left - padding.right;
    } else {
        childWidth = child.width;
    }
    return childWidth;
}

export default GetExpandedChildWidth;