import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildWidth = function (child) {
    var childWidth;
    if (child.isRexSizer) { // Sizer game object
        var childrenWidth = child.childrenWidth;
        if (childrenWidth == undefined) {
            return undefined;
        }

        childWidth = Math.max(child.minWidth, childrenWidth);
    } else {  // Normal game object
        if (child.minWidth !== undefined) {  // Force minWidth
            childWidth = child.minWidth;
        } else {
            childWidth = GetDisplayWidth(child);
        }
    }

    return childWidth;
}

export default GetChildWidth;