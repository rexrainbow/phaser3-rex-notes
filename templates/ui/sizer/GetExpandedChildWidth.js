var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;
    if (this.orientation === 0) { // x
        if ((childConfig.proportion > 0) && (this.proportionLength > 0)) {
            childWidth = (childConfig.proportion * this.proportionLength);
        }
    } else { // y
        if (childConfig.expand) {
            var space = this.space;
            var innerWidth = parentWidth - space.left - space.right;
            var padding = childConfig.padding;
            childWidth = innerWidth - padding.left - padding.right;
        }
    }
    return childWidth;
}

export default GetExpandedChildWidth;