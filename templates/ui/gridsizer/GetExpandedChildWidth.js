var GetExpandedChildWidth = function (child) {
    var newWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) { // x
        if (childConfig.proportion > 0) {            
            newWidth = (childConfig.proportion * this.proportionLength) - padding.left - padding.right;
        }
    } else { // y
        if (childConfig.expand) {
            newWidth = this.width - padding.left - padding.right;
        }
    }
    return newWidth;
}

export default GetExpandedChildWidth;