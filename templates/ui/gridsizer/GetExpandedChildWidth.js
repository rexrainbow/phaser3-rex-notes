var GetExpandedChildWidth = function (child, proportionLength) {
    var newWidth;
    if (proportionLength > 0) {
        var padding = child.rexSizer.padding;
        newWidth = proportionLength - padding.left - padding.right;
    }
    return newWidth;
}

export default GetExpandedChildWidth;