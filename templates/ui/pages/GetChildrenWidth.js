var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren.entries;
    var child, padding, childWidth;
    for (var key in children) {
        child = children[key];
        childWidth = (child.isRexSizer) ?
            Math.max(child.minWidth, child.childrenWidth) :
            child.displayWidth;

        padding = child.rexSizer.padding;
        childWidth += (padding.left + padding.right);
        result = Math.max(childWidth, result);
    }
    return result;
}

export default GetChildrenWidth;