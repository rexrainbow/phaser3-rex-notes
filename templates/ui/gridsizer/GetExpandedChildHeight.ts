var GetExpandedChildHeight = function(child?: any, rowHeight?: any) {
    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expandHeight) {
        var padding = childConfig.padding;
        childHeight = rowHeight - ((padding.top + padding.bottom) * this.scaleY);
    }
    return childHeight;
}

export default GetExpandedChildHeight;