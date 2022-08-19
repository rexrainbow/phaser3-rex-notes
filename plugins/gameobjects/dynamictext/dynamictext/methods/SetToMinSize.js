var SetToMinSize = function () {
    if ((this.fixedWidth > 0) && (this.fixedHeight > 0)) {
        this.setSize(this.fixedWidth, this.fixedHeight);
        return this;
    }

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

    var width;
    if (this.fixedWidth > 0) {
        width = this.fixedWidth;
    } else {
        width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    }
    var height;
    if (this.fixedHeight > 0) {
        height = this.fixedHeight;
    } else {
        height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    }

    this.setSize(width, height);
    return this;
}

export default SetToMinSize;