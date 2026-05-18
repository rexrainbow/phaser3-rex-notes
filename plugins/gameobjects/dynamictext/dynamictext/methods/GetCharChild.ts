import { IsChar } from '../bob/Types';

var GetCharChild = function(charIndex?: any, activeOnly?: any) {
    if (activeOnly === undefined) {
        activeOnly = true;
    }

    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (activeOnly && !child.active) {
            continue;
        }

        if (IsChar(child) && !child.removed) {
            if (charIndex === 0) {
                return child;
            } else {
                charIndex--;
            }
        }
    }

    return undefined;
}

export default GetCharChild;