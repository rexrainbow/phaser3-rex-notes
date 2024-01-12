import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetMaxChildHeight = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child, childHeight;
    var hasUnknownChildHeight = false;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }

        childHeight = this.getChildHeight(child);
        if (childHeight === undefined) {
            hasUnknownChildHeight = true;
        }

        if (hasUnknownChildHeight) {
            continue;
        }

        result = Math.max(childHeight, result);
    }

    if (hasUnknownChildHeight) {
        return undefined;
    }

    return result;
}
export default GetMaxChildHeight;