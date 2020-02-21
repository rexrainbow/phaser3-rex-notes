import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildHeight = function (child) {
    var padding = child.rexSizer.padding;
    return GetDisplayHeight(child) + padding.top + padding.bottom;
}
export default GetChildHeight;