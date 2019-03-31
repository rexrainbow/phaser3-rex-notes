var GetExpandedChildHeight = function (parent, child) {
    var newHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (parent.orientation === 0) { // x
        if (childConfig.expand) {
            newHeight = parent.height - padding.top - padding.bottom;
        }
    } else { // y
        if ((childConfig.proportion > 0) && (parent.proportionLength > 0)) {
            newHeight = (childConfig.proportion * parent.proportionLength);
        }
    }
    return newHeight;
}

export default GetExpandedChildHeight;