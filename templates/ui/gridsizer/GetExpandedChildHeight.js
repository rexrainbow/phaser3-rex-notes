var GetExpandedChildHeight = function (child, rowHeight) {
    var newHeight;
    var childConfig = child.rexSizer;    
    if (childConfig.expand) {
        var padding = childConfig.padding;
        newHeight = rowHeight - padding.top - padding.bottom;
    }
    return newHeight;
}

export default GetExpandedChildHeight;