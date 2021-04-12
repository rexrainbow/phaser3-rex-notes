import { GetDisplayWidth } from '../../../plugins/utils/size/GetDisplaySize.js';

// Override
var GetExpandedChildWidth = function (child, parentWidth) {
    return GetDisplayWidth(child);
}

export default GetExpandedChildWidth;