import ContainsPointTest from '../ContainsPoint.js';
import PointToChild from '../../basesizer/PointToChild.js';

var ContainsPoint = function (targetMode, gameObjects, x, y) {
    if (targetMode === 'parent') {
        var parent;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            parent = gameObjects[i];
            if (!ContainsPointTest(parent, x, y)) {
                continue;
            }

            if (parent.pointToChild) {
                return parent.pointToChild(x, y);
            } else {
                return PointToChild.call(parent, x, y);
            }
        }
    } else {  // direct mode
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var target = gameObjects[i];
            if (ContainsPointTest(target, x, y)) {
                return target;
            }
        }
    }

    return null;
}
export default ContainsPoint;