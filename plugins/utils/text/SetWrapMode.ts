import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType';
import GetTextObjectType from './GetTextObjectType';
import TextWrapByCharCallback from './TextWrapByCharCallback';
import WRAPMODE from '../../gameobjects/textbase/textstyle/WrapModes';

var SetWrapMode = function(textObject?: any, mode?: any) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType?: any) {
        case TextType:
            if (typeof mode === 'string') {
                mode = WRAPMODE[mode] || 0;
            }

            textObject.style.wrapMode = mode;
            switch (mode?: any) {
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