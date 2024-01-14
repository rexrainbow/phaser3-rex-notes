var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    if (this.orientation === 0) { // x
        if (childConfig.expand) {
            var space = this.space;
            var innerHeight = parentHeight - space.top - space.bottom;
            var padding = childConfig.padding;
            childHeight = innerHeight - padding.top - padding.bottom;
        }
    } else { // y
        if ((childConfig.proportion > 0) && (this.proportionLength > 0)) {
            childHeight = (childConfig.proportion * this.proportionLength);
        }
    }
    return childHeight;
}

export default GetExpandedChildHeight;