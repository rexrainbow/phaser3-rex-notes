var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expandHeight) {
        var space = this.space;
        var innerHeight = parentHeight - space.top - space.bottom;
        var padding = childConfig.padding;
        childHeight = innerHeight - padding.top - padding.bottom;
    }
    return childHeight;
}

export default GetExpandedChildHeight;