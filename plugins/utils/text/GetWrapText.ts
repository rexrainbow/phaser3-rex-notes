import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType';
import GetTextObjectType from './GetTextObjectType';

var GetWrapText = function(textObject?: any, text?: any) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType?: any) {
        case TextType:
            textObject.style.syncFont(textObject.canvas, textObject.context);
            text = textObject.runWordWrap(text);
            break;
        case TagTextType:
            text = textObject.getText(text, undefined, undefined, true);
            break;
        case BitmapTextType:
            text = textObject.setText(text).getTextBounds().wrappedText;
            break;
    }
    return text;
}

export default GetWrapText;