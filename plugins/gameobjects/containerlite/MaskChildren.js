import MaskToGameObject from '../../utils/mask/MaskToGameObject.js';

const Intersects = Phaser.Geom.Intersects.RectangleToRectangle;
const Overlaps = Phaser.Geom.Rectangle.Overlaps;

var MaskChildren = function (parent, mask, children) {
    if (!mask) {
        return;
    }

    if (children === undefined) {
        children = parent.getAllChildren();
    }

    var parentBounds = parent.getBounds();
    var maskGameObject = MaskToGameObject(mask);

    var child, childBounds, visiblePointsNumber;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.hasOwnProperty('isRexContainerLite')) {
            continue;
        }
        if (child === maskGameObject) {
            continue;
        }

        if (child.getBounds) {
            childBounds = child.getBounds(childBounds);
            visiblePointsNumber = containsPoints(parentBounds, childBounds);
            switch (visiblePointsNumber) {
                case 4: // 4 points are all inside visible window, set visible
                    showAll(child, mask);
                    break;
                case 0: // No point is inside visible window
                    // Parent intersects with child, or parent is inside child, set visible, and apply mask
                    if (Intersects(parentBounds, childBounds) || Overlaps(parentBounds, childBounds)) {
                        showSome(child, mask);
                    } else { // Set invisible
                        showNone(child, mask);
                    }
                    break;
                default: // Part of points are inside visible window, set visible, and apply mask
                    showSome(child, mask);
                    break;
            }
        } else {
            showSome(child, mask);
        }

        parent
            .resetChildVisibleState(child) // Reset local visible via child's visible
            .updateChildVisible(child);  // Set child's visible via parent and local visible
    }
}

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

var showAll = function (child, mask) {
    child.setVisible(true).clearMask();
}

var showSome = function (child, mask) {
    child.setVisible(true).setMask(mask);
}

var showNone = function (child, mask) {
    child.setVisible(false).clearMask();
}

export default MaskChildren;