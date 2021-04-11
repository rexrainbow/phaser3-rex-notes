import { GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

// Override
var GetExpandedChildHeight = function (child) {
    return GetDisplayHeight(child);
}

export default GetExpandedChildHeight;