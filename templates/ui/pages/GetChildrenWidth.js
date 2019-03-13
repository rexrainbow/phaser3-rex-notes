var GetChildrenWidth = function () {
    if (!this.visible) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren.entries;
    var child, padding, childWidth, visibleSave;
    for (var key in children) {
        child = children[key];

        // Page might be invisible
        visibleSave = child.visible;
        child.visible = true;

        childWidth = (child.isRexSizer) ?
            Math.max(child.minWidth, child.childrenWidth) :
            child.width;

        padding = child.rexSizer.padding;
        childWidth += (padding.left + padding.right);
        result = Math.max(childWidth, result);

        child.visible = visibleSave;
    }
    return result;
}

export default GetChildrenWidth;