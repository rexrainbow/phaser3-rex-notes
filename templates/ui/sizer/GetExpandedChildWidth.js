var GetExpandedChildWidth = function (parent, child) {
    var newWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.proportion === -1) { // Background
        newWidth = parent.width - padding.left - padding.right;
    } else if (parent.orientation === 0) { // x
        if ((childConfig.proportion > 0) && (parent.proportionLength > 0)) {
            newWidth = (childConfig.proportion * parent.proportionLength) - padding.left - padding.right;
        }
    } else { // y
        if (childConfig.expand) {
            newWidth = parent.width - padding.left - padding.right;
        }
    }
    return newWidth;
}

export default GetExpandedChildWidth;