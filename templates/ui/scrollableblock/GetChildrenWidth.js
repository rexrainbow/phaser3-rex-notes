import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    var child = this.child,
        childConfig = child.rexSizer;
    if (childConfig.hidden) {
        result = 0;
    } else if (this.scrollMode === 0) { // scroll y
        result = (child.isRexSizer) ?
            Math.max(child.minWidth, child.childrenWidth) :
            GetDisplayWidth(child);
    } else { // scroll x
        result = 0;
    }

    return result;
}

export default GetChildrenWidth;