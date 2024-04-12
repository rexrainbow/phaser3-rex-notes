import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';
import TextWrapByCharCallback from './TextWrapByCharCallback.js';
import WRAPMODE from '../../gameobjects/textbase/textstyle/WrapModes.js';

var SetWrapMode = function (textObject, mode) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TextType:
            if (typeof mode === 'string') {
                mode = WRAPMODE[mode] || 0;
            }
            if (mode === 2) {
                textObject.style.wordWrapCallback = TextWrapByCharCallback;
            }
            break;

        case TagTextType:
            if (typeof mode === 'string') {
                mode = WRAPMODE[mode] || 0;
            }
            textObject.style.wrapMode = mode;
            break;

        case BitmapTextType:
            break;


    }
}

export default SetWrapMode;