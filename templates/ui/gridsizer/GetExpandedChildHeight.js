var GetExpandedChildHeight = function (child, proportionLength) {
    var newHeight;
    if (proportionLength > 0) {
        var padding = child.rexSizer.padding;
        newHeight = proportionLength - padding.top - padding.bottom;
    }
    return newHeight;
}

export default GetExpandedChildHeight;