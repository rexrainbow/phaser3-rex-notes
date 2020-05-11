var GetExpandedChildHeight = function (parent, child) {
    var newHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandHeight) {
        newHeight = parent.innerHeight - padding.top - padding.bottom;
    }
    return newHeight;
}

export default GetExpandedChildHeight;