var GetExpandedChildWidth = function (child, colWidth) {
    var newWidth;
    var childConfig = child.rexSizer;    
    if (childConfig.expand) {
        var padding = childConfig.padding;
        newWidth = colWidth - padding.left - padding.right;
    }
    return newWidth;
}

export default GetExpandedChildWidth;