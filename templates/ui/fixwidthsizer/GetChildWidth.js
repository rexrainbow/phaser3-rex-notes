import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildWidth = function (child) {
    var padding = child.rexSizer.padding;
    return GetDisplayWidth(child) + padding.left + padding.right;
}
export default GetChildWidth;