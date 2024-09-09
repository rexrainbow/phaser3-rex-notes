var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width * this.scaleX;
    }

    var childWidth;
    var sizerConfig = child.rexSizer;
    if (this.orientation === 0) { // x
        if ((sizerConfig.proportion > 0) && (this.proportionLength > 0)) {
            childWidth = (sizerConfig.proportion * this.proportionLength);
        }
    } else { // y
        if (sizerConfig.expand) {
            var space = this.space;
            var innerWidth = parentWidth - (space.left + space.right) * this.scaleX;
            var padding = sizerConfig.padding;
            childWidth = innerWidth - (padding.left + padding.right) * this.scaleX;
        }
    }
    return childWidth;
}

export default GetExpandedChildWidth;