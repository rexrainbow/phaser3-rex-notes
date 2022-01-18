// Default method
var RunWidthWrap = function (parentWidth) {
    var child, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout)
        ) {
            continue;
        }

        childWidth = this.getExpandedChildWidth(child, parentWidth);
        if (child.isRexSizer) {
            childWidth = child.resolveWidth(childWidth);
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
    return this;
}

export default RunWidthWrap;