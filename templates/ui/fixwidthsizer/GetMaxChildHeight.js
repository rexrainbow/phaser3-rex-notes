import GetChildHeight from './GetChildHeight.js';

var GetMaxChildHeight = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }
        result = Math.max(result, GetChildHeight(child));
    }
    return result;
}
export default GetMaxChildHeight;