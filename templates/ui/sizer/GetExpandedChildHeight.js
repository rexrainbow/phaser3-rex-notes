var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var sizerConfig = child.rexSizer;
    if (this.orientation === 0) { // x
        if (sizerConfig.expand) {
            var space = this.space;
            var innerHeight = parentHeight - ((space.top + space.bottom) * this.scaleY);
            var padding = sizerConfig.padding;
            childHeight = innerHeight - ((padding.top + padding.bottom) * this.scaleY);
        }
    } else { // y
        if ((sizerConfig.proportion > 0) && (this.proportionLength > 0)) {
            childHeight = (sizerConfig.proportion * this.proportionLength);
        }
    }
    return childHeight;
}

export default GetExpandedChildHeight;