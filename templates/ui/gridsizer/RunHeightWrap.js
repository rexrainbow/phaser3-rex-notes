// Default method
var RunHeightWrap = function (height) {
    var child, childHeight;
    var rowHeight;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runHeightWrap)
        ) {
            continue;
        }

        rowHeight = this.getRowHeight(Math.floor(parseInt(i) / this.rowCount));
        childHeight = this.getExpandedChildHeight(child, rowHeight);
        if (child.isRexSizer) {
            childHeight = child.resolveHeight(childHeight);
        }
        child.runHeightWrap(childHeight);
    }
    return this;
}

export default RunHeightWrap;