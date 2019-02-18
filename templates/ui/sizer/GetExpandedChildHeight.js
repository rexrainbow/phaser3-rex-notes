var GetExpandedChildHeight = function (parent, child) {
    var newHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.proportion === -1) { // Background
        newHeight = parent.height - padding.top - padding.bottom;
    } else if (parent.orientation === 0) { // x
        if (childConfig.expand) {
            newHeight = parent.height - padding.top - padding.bottom;
        }
    } else { // y
        if ((childConfig.proportion > 0) && (parent.proportionLength > 0)) {
            newHeight = (childConfig.proportion * parent.proportionLength) - padding.top - padding.bottom;
        }
    }
    return newHeight;
}

export default GetExpandedChildHeight;