import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildHeight = function (child) {
    var childHeight;
    if (child.isRexSizer) {  // Sizer game object
        var childrenHeight = child.childrenHeight;
        if (childrenHeight === undefined) {
            return undefined;
        }

        childHeight = Math.max(child.minHeight, childrenHeight);
    } else {  // Normal game object
        if (child.minHeight !== undefined) {  // Force minHeight
            childHeight = child.minHeight;
        } else {
            childHeight = GetDisplayHeight(child);
        }
    }
    return childHeight;
}

export default GetChildHeight;