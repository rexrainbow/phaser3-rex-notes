var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    var hasUnknownChildHeight = false;

    for (var key in children) {
        child = children[key];

        childHeight = this.getChildHeight(child);
        if (childHeight === undefined) {
            hasUnknownChildHeight = true;
        }

        if (hasUnknownChildHeight) {
            continue;
        }

        padding = child.rexSizer.padding;
        childHeight += (padding.top + padding.bottom) * this.scaleY;
        result = Math.max(childHeight, result);
    }

    if (hasUnknownChildHeight) {
        return undefined;
    }

    return result + ((this.space.top + this.space.bottom) * this.scaleY);
}

export default GetChildrenHeight;