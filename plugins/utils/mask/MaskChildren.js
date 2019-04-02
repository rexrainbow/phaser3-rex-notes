import MaskToGameObject from './MaskToGameObject.js';

var MaskChildren = function (parent, mask) {
    var children = parent.getAllChildren();
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
                    child.setVisible(true).clearMask();
                    break;
                case 0: // No point is inside visible window, set invisible
                    child.setVisible(false).clearMask();
                    break;
                default: // Part of points are inside visible window, set visible, and apply mask
                    child.setVisible(true).setMask(mask);
                    break;
            }
        } else {
            child.setMask(mask);
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

export default MaskChildren;