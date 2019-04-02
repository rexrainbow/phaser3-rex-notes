var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren.entries;
    var child, padding, childHeight, visibleSave;
    for (var key in children) {
        child = children[key];

        // Page might be invisible
        visibleSave = child.visible;
        child.visible = true;

        childHeight = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            child.height;

        padding = child.rexSizer.padding;
        childHeight += (padding.top + padding.bottom);
        result = Math.max(childHeight, result);

        child.visible = visibleSave;
    }
    return result;
}

export default GetChildrenHeight;