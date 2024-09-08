import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildWidth = function (child) {
    var childWidth;
    if (child.isRexSizer) { // Sizer game object
        var childrenWidth = child.childrenWidth;
        if (childrenWidth == undefined) {
            return undefined;
        }

        var childMinWidth = child.minWidth * child.scaleX;
        childWidth = Math.max(childMinWidth, childrenWidth);
    } else {  // Normal game object
        if (child.minWidth !== undefined) {  // Force minWidth
            childWidth = child.minWidth;
        } else if (child._minWidth !== undefined) {  // Force minWidth
            childWidth = child._minWidth;
        } else {
            childWidth = GetDisplayWidth(child);
        }
    }

    return childWidth;
}

export default GetChildWidth;