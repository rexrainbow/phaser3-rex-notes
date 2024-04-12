import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';
import WRAPMODE from '../../gameobjects/textbase/textstyle/WrapModes.js';

var SetWrapMode = function (textObject, mode) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TagTextType:
            if (typeof mode === 'string') {
                mode = WRAPMODE[mode] || 0;
            }
            textObject.style.wrapMode = mode;
            break;

        case TextType:
        case BitmapTextType:
        default:
            // Do nothing
            break;

    }
}

export default SetWrapMode;