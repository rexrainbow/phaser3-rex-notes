var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width * this.scaleX;
    }

    var childWidth;
    var childConfig = child.rexSizer;
    if (childConfig.expandWidth) {
        var innerWidth = parentWidth - ((this.space.left + this.space.right) * this.scaleX);
        var padding = childConfig.padding;
        childWidth = innerWidth - ((padding.left + padding.right) * this.scaleX);
    }
    return childWidth;
}

export default GetExpandedChildWidth;