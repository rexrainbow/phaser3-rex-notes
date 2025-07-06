// Default method
var RunHeightWrap = function (parentHeight) {
    var child, expandedChildHeight, childHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runHeightWrap)
        ) {
            continue;
        }

        if (parentHeight !== undefined) {
            // Normal case
            expandedChildHeight = this.getExpandedChildHeight(child, parentHeight);
            if (child.isRexSizer) {
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
            } else {
                childHeight = expandedChildHeight;
            }
            child.runHeightWrap(childHeight);

        } else if (child.minHeight > 0) {
            // Child has minHeight
            child.runHeightWrap(child.minHeight);

        }
    }
    return this;
}

export default RunHeightWrap;