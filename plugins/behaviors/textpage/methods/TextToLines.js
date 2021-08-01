import {
    TextType, TagTextType, BitmapTextType
} from '../../../utils/system/GetTextObjectType.js';
import GetTextObjectType from '../../../utils/system/GetTextObjectType.js';

var TextToLines = function (textObject, text, lines) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
        case TextType:
            lines = textObject.getWrappedText(text); // Array of string
            break;
        case TagTextType:
            lines = textObject.getPenManager(text, lines); // Pens-manager
            break;
        case BitmapTextType:
            lines = textObject
                .setText(text)
                .getTextBounds().wrappedText.split('\n');
            break;
    }
    return lines;
}

export default TextToLines;