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

            textObject.style.wrapMode = mode;
            switch (mode) {
                case 2:  // CHAR_WRAP
                case 3:  // MIX_WRAP
                    textObject.style.wordWrapCallback = TextWrapByCharCallback;
                    break;

                case 1:  // WORD_WRAP
                default:  // NO_WRAP
                    textObject.style.wordWrapCallback = null;
                    break;
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