import PointToChild from './PointToChild.js';
import ContainsPoint from '../ContainsPoint.js';

var EmitChildEvent = function (eventEmitter, eventName, targets, targetMode, x, y, pointer, event) {
    var child;
    if (y === undefined) {
        child = x;
    } else {
        if (targetMode === 'parent') {
            child = PointToChild(targets, x, y);
        } else {
            for (var i = 0, cnt = targets.length; i < cnt; i++) {
                var target = targets[i];
                if (ContainsPoint(target, x, y)) {
                    child = target;
                    break;
                }
            }
        }
    }

    if (!child) {
        return;
    }

    eventEmitter.emit(eventName, child, pointer, event);
}

export default EmitChildEvent;