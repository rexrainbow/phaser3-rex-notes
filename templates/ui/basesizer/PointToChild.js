import IsFunction from '../../../plugins/utils/object/IsFunction.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';

var PointToChild = function (x, y, preTest, postTest, children) {
    if (!IsFunction(preTest)) {
        children = preTest;
        preTest = undefined;
        postTest = undefined;
    }

    if (children === undefined) {
        if (this.sizerChildren) {
            children = this.sizerChildren;
        } else {
            children = this.children;
        }
    }

    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }

    if (IsArray(children)) {
        var child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    } else {
        var child;
        for (var key in children) {
            child = children[key];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    }

    return null;
}

var ContainsPoint = function (gameObject, x, y, preTest, postTest) {
    // Not a kind of game object
    if (!IsGameObject(gameObject)) {
        return false;
    }

    // Is a hidden sizer game object
    if (gameObject.rexSizer && gameObject.rexSizer.hidden) {
        return false;
    }

    if (preTest && !preTest(gameObject, x, y)) {
        return false;
    }

    if (!gameObject.getBounds(globRect).contains(x, y)) {
        return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
        return false;
    }

    return true;
}

var globRect = undefined;

export default PointToChild;