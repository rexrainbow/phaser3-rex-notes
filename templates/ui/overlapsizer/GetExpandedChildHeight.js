var GetExpandedChildHeight = function (child) {
    var childHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (childConfig.expandHeight) {
        childHeight = this.innerHeight - padding.top - padding.bottom;
    }
    return childHeight;
}

export default GetExpandedChildHeight;