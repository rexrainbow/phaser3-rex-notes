import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

// Override
var GetExpandedChildHeight = function (child, parentHeight) {
    return GetDisplayHeight(child);
}

export default GetExpandedChildHeight;