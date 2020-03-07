var GetExpandedChildWidth = function (parent, child) {
    var newWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandWidth) {
        newWidth = parent.width - padding.left - padding.right;
    }
    return newWidth;
}

export default GetExpandedChildWidth;