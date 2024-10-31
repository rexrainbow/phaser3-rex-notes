import { IsChar } from '../bob/Types.js';

var ForEachCharChild = function (callback, scope, activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children.filter(function (child) {
        if (activeOnly && !child.active) {
            return false;
        }
        if (!IsChar(child) || child.removed) {
            return false;
        }

        return true;
    });

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        var isBreak;
        if (scope) {
            isBreak = callback.call(this, child, i, children);
        } else {
            isBreak = callback(child, i, children);
        }

        if (isBreak) {
            break;
        }
    }

    return this;
}

export default ForEachCharChild;