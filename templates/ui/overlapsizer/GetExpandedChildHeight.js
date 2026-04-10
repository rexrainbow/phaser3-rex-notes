var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    var expandHeight = childConfig.expandHeight;
    if (expandHeight) {
        var innerHeight = parentHeight - ((this.space.top + this.space.bottom) * this.scaleY);
        var padding = childConfig.padding;
        childHeight = (innerHeight - ((padding.top + padding.bottom) * this.scaleY)) * expandHeight;
    }
    return childHeight;
}

export default GetExpandedChildHeight;
