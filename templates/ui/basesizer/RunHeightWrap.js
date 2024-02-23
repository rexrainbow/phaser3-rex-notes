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
    }
    return this;
}

export default RunHeightWrap;