var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expandHeight) {
        var innerHeight = parentHeight - ((this.space.top + this.space.bottom) * this.scaleY);
        var padding = childConfig.padding;
        childHeight = innerHeight - ((padding.top + padding.bottom) * this.scaleY);
    }
    return childHeight;
}

export default GetExpandedChildHeight;