var RunHeightWrap = function (height) {
    var child, expandedChildHeight, childHeight;
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
        expandedChildHeight = this.getExpandedChildHeight(child, rowHeight);
        if (child.isRexSizer) {
            childHeight = child.resolveHeight(expandedChildHeight);
            if (childHeight === undefined) {
                childHeight = expandedChildHeight;
            }
        }
        child.runHeightWrap(childHeight);
    }
    return this;
}

export default RunHeightWrap;