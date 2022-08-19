var SetToMinSize = function () {
    var children = this.children;
    var maxX = 0,
        maxY = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.active || !child.visible) {
            continue;
        }

        maxX = Math.max(maxX, child.x);
        maxY = Math.max(maxY, child.y);
    }

    var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

    // Ignore fixedWidth, and fixedHeight
    if ((this.width !== width) || (this.height !== height)) {
        this.dirty = true;
        this.width = width;
        this.height = height;
    }
    return this;
}

export default SetToMinSize;