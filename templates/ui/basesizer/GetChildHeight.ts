import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize';

var GetChildHeight = function(child?: any) {
    var childHeight;
    if (child.isRexSizer) {  // Sizer game object
        var childrenHeight = child.childrenHeight;
        if (childrenHeight === undefined) {
            return undefined;
        }

        var childMinHeight = child.minHeight * child.scaleY;
        childHeight = Math.max(childMinHeight, childrenHeight);
    } else {  // Normal game object
        if (child.minHeight !== undefined) {  // Force minHeight
            childHeight = child.minHeight;
        } else if (child._minHeight !== undefined) {
            childHeight = child._minHeight;
        } else {
            childHeight = GetDisplayHeight(child);
        }
    }
    return childHeight;
}

export default GetChildHeight;