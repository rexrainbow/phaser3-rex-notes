const Decompose = Phaser.Geom.Rectangle.Decompose;

var ResetChildPosition = function () {
    var x = this.left;
    var y = this.top;
    if (this.scrollMode === 0) {
        y += this.childOY;
    } else {
        x += this.childOY;
    }
    this.child.setPosition(x, y);
    this.resetChildState(this.child);

    // Apply mask
    var childMask = this.childMask;
    var geometryMask = childMask._geometryMask
    var parentBounds = this.getBounds();
    var children = this.getAllChildren(),
        child, childBounds, visiblePointsNumber;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.hasOwnProperty('isRexContainerLite')) {
            continue;
        }
        if (child === childMask) {
            continue;
        }

        if (child.getBounds) {
            childBounds = child.getBounds(childBounds);
            visiblePointsNumber = containsPoints(parentBounds, childBounds);
            switch (visiblePointsNumber) {
                case 4: // 4 points are all inside visible window, set visible
                    child.setVisible(true).clearMask();
                    break;
                case 0: // no point is inside visible window, set invisible
                    child.setVisible(false).clearMask();
                    break;
                default: // Part of points are inside visible window, set visible, and apply mask
                    child.setVisible(true).setMask(geometryMask);
                    break;
            }
        } else {
            child.setMask(geometryMask);
        }

    }

};

var containsPoints = function (rectA, rectB) {
    var result = 0;
    var top = rectB.top,
        bottom = rectB.bottom,
        left = rectB.left,
        right = rectB.right;
    result += rectA.contains(left, top) ? 1 : 0;
    result += rectA.contains(left, bottom) ? 1 : 0;
    result += rectA.contains(right, top) ? 1 : 0;
    result += rectA.contains(right, bottom) ? 1 : 0;
    return result;
};

export default ResetChildPosition;