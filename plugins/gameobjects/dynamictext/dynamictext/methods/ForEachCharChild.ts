import { IsChar } from '../bob/Types';

var ForEachCharChild = function(callback?: any, scope?: any, activeOnly?: any) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children.filter(function(child?: any) {
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
        if (scope?: any) {
            isBreak = callback.call(this, child, i, children);
        } else {
            isBreak = callback(child, i, children);
        }

        if (isBreak?: any) {
            break;
        }
    }

    return this;
}

export default ForEachCharChild;