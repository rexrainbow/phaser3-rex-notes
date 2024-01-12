// Default method
var RunHeightWrap = function (parentHeight) {
    var child, childHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runHeightWrap)
        ) {
            continue;
        }

        childHeight = this.getExpandedChildHeight(child, parentHeight);
        if (child.isRexSizer) {
            childHeight = child.resolveHeight(childHeight);
        }
        child.runHeightWrap(childHeight);
    }
    return this;
}

export default RunHeightWrap;