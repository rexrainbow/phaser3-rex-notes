import { CharTypeName } from '../bob/Types.js';

var GetText = function (activeOnly) {
    if (activeOnly === undefined) {
        activeOnly = false;
    }

    var children = this.children;
    var text = '';
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (activeOnly && !child.active) {
            continue;
        }

        if (child.type !== CharTypeName) {
            continue;
        }

        text += child.text;
    }
    return text;
}

export default GetText;