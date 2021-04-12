var GetExpandedChildHeight = function (child, parentHeight) {
    if (parentHeight === undefined) {
        parentHeight = this.height;
    }

    var childHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandHeight) {
        var innerHeight = parentHeight - this.space.top - this.space.bottom;
        childHeight = innerHeight - padding.top - padding.bottom;
    } else {
        childHeight = child.height;
    }
    return childHeight;
}

export default GetExpandedChildHeight;