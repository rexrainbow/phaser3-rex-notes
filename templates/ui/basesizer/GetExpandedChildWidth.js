import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

// Override
var GetExpandedChildWidth = function (child) {
    return GetDisplayWidth(child);
}

export default GetExpandedChildWidth;