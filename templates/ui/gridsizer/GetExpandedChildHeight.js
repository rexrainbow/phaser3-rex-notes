var GetExpandedChildHeight = function (child, rowHeight) {
    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expandHeight) {
        var padding = childConfig.padding;
        childHeight = rowHeight - padding.top - padding.bottom;
    }
    return childHeight;
}

export default GetExpandedChildHeight;