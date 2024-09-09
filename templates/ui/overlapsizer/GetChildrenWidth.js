var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    var hasUnknownChildWidth = false;

    for (var key in children) {
        child = children[key];

        childWidth = this.getChildWidth(child);
        if (childWidth === undefined) {
            hasUnknownChildWidth = true;
        }

        if (hasUnknownChildWidth) {
            continue;
        }

        padding = child.rexSizer.padding;
        childWidth += (padding.left + padding.right) * this.scaleX;
        result = Math.max(childWidth, result);
    }

    if (hasUnknownChildWidth) {
        return undefined;
    }

    return result + ((this.space.left + this.space.right) * this.scaleX);
}

export default GetChildrenWidth;