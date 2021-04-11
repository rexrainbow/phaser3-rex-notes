var GetExpandedChildHeight = function (child) {
    var childHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) { // x
        if (childConfig.expand) {
            childHeight = this.innerHeight - padding.top - padding.bottom;
        }
    } else { // y
        if ((childConfig.proportion > 0) && (this.proportionLength > 0)) {
            childHeight = (childConfig.proportion * this.proportionLength);
        }
    }
    return childHeight;
}

export default GetExpandedChildHeight;