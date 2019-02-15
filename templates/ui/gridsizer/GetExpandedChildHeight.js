var GetExpandedChildHeight = function (child) {
    var newHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) { // x
        if (childConfig.expand) {
            newHeight = this.height - padding.top - padding.bottom;
        }
    } else { // y
        if (childConfig.proportion > 0) {
            newHeight = (childConfig.proportion * this.proportionLength) - padding.top - padding.bottom;
        }
    }
    return newHeight;
}

export default GetExpandedChildHeight;