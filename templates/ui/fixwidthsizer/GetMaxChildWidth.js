import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetMaxChildWidth = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child, childWidth;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }

        childWidth = (child.isRexSizer) ?
            Math.max(child.minWidth, child.childrenWidth) :
            GetDisplayWidth(child);
        result = Math.max(childWidth, result);
    }
    return result;
}
export default GetMaxChildWidth;