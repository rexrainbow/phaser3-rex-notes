var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren.entries;
    var child, padding, childHeight;
    for (var key in children) {
        child = children[key];
        childHeight = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            child.displayHeight;

        padding = child.rexSizer.padding;
        childHeight += (padding.top + padding.bottom);
        result = Math.max(childHeight, result);
    }
    return result;
}

export default GetChildrenHeight;