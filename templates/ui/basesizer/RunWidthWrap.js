// Default method
var RunWidthWrap = function (width) {
    var children = this.getChildrenSizers(),
        child, childWidth;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child || child.ignoreLayout) {
            continue;
        }

        childWidth = this.getExpandedChildWidth(child, width);
        if (childWidth === undefined) {
            childWidth = this.resolveWidth(this);
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
    return this;
}

export default RunWidthWrap;