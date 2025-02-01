import { SetMask, ClearMask } from '../../../../utils/mask/MaskMethods.js';

const Intersects = Phaser.Geom.Intersects.RectangleToRectangle;
const Overlaps = Phaser.Geom.Rectangle.Overlaps;

var MaskChildren = function ({
    parent,
    maskGameObject,
    children,

    onVisible, onInvisible, scope,
}) {

    if (!maskGameObject) {
        return;
    }

    if (children === undefined) {
        children = parent.getAllChildren();
    }

    var hasAnyVisibleCallback = !!onVisible || !!onInvisible;

    var parentBounds = parent.getBounds();

    var child, childBounds, visiblePointsNumber;
    var isChildVisible;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child === maskGameObject) {
            continue;
        }
        if (!IsVisible(child)) {  // Child is invisible before masking
            continue;
        }

        isChildVisible = child.visible;
        if (child.getBounds) {
            childBounds = child.getBounds(childBounds);
            visiblePointsNumber = ContainsPoints(parentBounds, childBounds);
            switch (visiblePointsNumber) {
                case 4: // 4 points are all inside visible window, set visible                     
                    ShowAll(parent, child, maskGameObject);
                    break;
                case 0: // No point is inside visible window
                    // Parent intersects with child, or parent is inside child, set visible, and apply mask
                    if (Intersects(parentBounds, childBounds) || Overlaps(parentBounds, childBounds)) {
                        ShowSome(parent, child, maskGameObject);
                    } else { // Set invisible
                        ShowNone(parent, child, maskGameObject);
                    }
                    break;
                default: // Part of points are inside visible window, set visible, and apply mask
                    ShowSome(parent, child, maskGameObject);
                    break;
            }
        } else {
            ShowSome(parent, child, maskGameObject);
        }

        if (hasAnyVisibleCallback && (child.visible !== isChildVisible)) {
            var callback = (child.visible) ? onVisible : onInvisible;
            if (callback) {
                if (scope) {
                    callback.call(scope, child, parent);
                } else {
                    callback(child, parent);
                }
            }
        }
    }
}

var IsVisible = function (gameObject) {
    if (!gameObject.displayList) {
        return false;
    }

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

var ContainsPoints = function (rectA, rectB) {
    var top = rectB.top,
        bottom = rectB.bottom,
        left = rectB.left,
        right = rectB.right;

    var result = 0;
    result += rectA.contains(left, top) ? 1 : 0;
    result += rectA.contains(left, bottom) ? 1 : 0;
    result += rectA.contains(right, top) ? 1 : 0;
    result += rectA.contains(right, bottom) ? 1 : 0;
    return result;
};

var ShowAll = function (parent, child, maskGameObject) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
        ClearMask(child);
        parent.setChildMaskVisible(child, true);

    } else {
        child.syncChildrenEnable = false;
        parent.setChildMaskVisible(child, true);
        child.syncChildrenEnable = true;

    }

}

var ShowSome = function (parent, child, maskGameObject) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
        SetMask(child, maskGameObject);
        parent.setChildMaskVisible(child, true);

    } else {
        child.syncChildrenEnable = false;
        parent.setChildMaskVisible(child, true);
        child.syncChildrenEnable = true;

    }

}

var ShowNone = function (parent, child, maskGameObject) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
        ClearMask(child);
        parent.setChildMaskVisible(child, false);

    } else {
        child.syncChildrenEnable = false;
        parent.setChildMaskVisible(child, false);
        child.syncChildrenEnable = true;

    }

}

export default MaskChildren;