import ContainsPointTest from '../ContainsPoint';
import PointToChild from '../../basesizer/PointToChild';

var ContainsPoint = function(targetMode?: any, gameObjects?: any, x?: any, y?: any) {
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