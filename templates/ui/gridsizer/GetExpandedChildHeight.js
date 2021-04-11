var GetExpandedChildHeight = function (child, rowHeight) {
    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expand) {
        var padding = childConfig.padding;
        childHeight = rowHeight - padding.top - padding.bottom;
    } else {
        childHeight = child.height;
    }
    return childHeight;
}

export default GetExpandedChildHeight;