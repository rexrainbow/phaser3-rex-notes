import GetChildHeight from './GetChildHeight.js';

var GetMaxChildHeight = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        result = Math.max(result, GetChildHeight(children[i]));
    }
    return result;
}
export default GetMaxChildHeight;