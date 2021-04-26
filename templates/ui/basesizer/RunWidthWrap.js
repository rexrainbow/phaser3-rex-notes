// Default method
var RunWidthWrap = function (width) {
    var child, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout)
        ) {
            continue;
        }

        childWidth = this.getExpandedChildWidth(child, width);
        if (childWidth === undefined) {
            childWidth = this.resolveWidth(childWidth);
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
    return this;
}

export default RunWidthWrap;