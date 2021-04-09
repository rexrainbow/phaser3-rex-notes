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
        if (!isVisible(child)) {  // Child is invisible before masking
            continue;
        }

        if (child.getBounds) {
            childBounds = child.getBounds(childBounds);
            visiblePointsNumber = containsPoints(parentBounds, childBounds);
            switch (visiblePointsNumber) {
                case 4: // 4 points are all inside visible window, set visible
                    showAll(parent, child, mask);
                    break;
                case 0: // No point is inside visible window
                    // Parent intersects with child, or parent is inside child, set visible, and apply mask
                    if (Intersects(parentBounds, childBounds) || Overlaps(parentBounds, childBounds)) {
                        showSome(parent, child, mask);
                    } else { // Set invisible
                        showNone(parent, child, mask);
                    }
                    break;
                default: // Part of points are inside visible window, set visible, and apply mask
                    showSome(parent, child, mask);
                    break;
            }
        } else {
            showSome(parent, child, mask);
        }
    }
}

var isVisible = function (gameObject) {
    while (1) {
        var localState = gameObject.rexContainer;
        if (!localState) { // Top game object
            return gameObject.visible;
        } else if (localState.visible) {
            var parent = localState.parent;
            if (parent) { // Test parent's visible
                gameObject = parent;
                continue;
            } else { // Top visible game object
                return true;
            }
        } else { // Current game object is invisible
            return false;
        }
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

var showAll = function (parent, child, mask) {
    parent.setChildMaskVisible(child, true);
    if (child.clearMask) {
        child.clearMask();
    }
}

var showSome = function (parent, child, mask) {
    parent.setChildMaskVisible(child, true);
    if (child.setMask) {
        child.setMask(mask);
    }
}

var showNone = function (parent, child, mask) {
    parent.setChildMaskVisible(child, false);
    if (child.clearMask) {
        child.clearMask();
    }
}

export default MaskChildren;