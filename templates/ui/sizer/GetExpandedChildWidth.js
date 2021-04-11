var GetExpandedChildWidth = function (child) {
    var childWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) { // x
        if ((childConfig.proportion > 0) && (this.proportionLength > 0)) {
            childWidth = (childConfig.proportion * this.proportionLength);
        } else {
            childWidth = child.width;
        }
    } else { // y
        if (childConfig.expand) {
            childWidth = this.innerWidth - padding.left - padding.right;
        } else {
            childWidth = child.width;
        }
    }
    return childWidth;
}

export default GetExpandedChildWidth;