// Default method
var RunWidthWrap = function (width) {
    var child, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        childWidth = this.getExpandedChildWidth(child);
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
    return this;
}

export default RunWidthWrap;