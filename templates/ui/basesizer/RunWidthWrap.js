// Default method
var RunWidthWrap = function (parentWidth) {
    var child, expandedChildWidth, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runWidthWrap)
        ) {
            continue;
        }

        if (parentWidth !== undefined) {
            // Normal case
            expandedChildWidth = this.getExpandedChildWidth(child, parentWidth);
            if (child.isRexSizer) {
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
            } else {
                childWidth = expandedChildWidth;
            }
            child.runWidthWrap(childWidth);

        } else if (child.minWidth > 0) {
            // Child has minWidth
            child.runWidthWrap(child.minWidth);

        }
    }
    return this;
}

export default RunWidthWrap;