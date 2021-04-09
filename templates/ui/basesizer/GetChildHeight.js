import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildHeight = function (child) {
    var childHeight;
    if (child.isRexSizer) {  // Sizer game object
        childHeight = Math.max(child.minHeight, child.childrenHeight);
    } else {  // Normal game object
        if (child.hasOwnProperty('minHeight')) {  // Force minHeight
            childHeight = child.minHeight;
        } else {
            childHeight = GetDisplayHeight(child);
        }
    }
    return childHeight;
}

export default GetChildHeight;