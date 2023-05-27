import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType.js';
import GetTextObjectType from './GetTextObjectType.js';

var TextHeightToLinesCount = function (textObject) {
    var textObjectType = GetTextObjectType(textObject);
    var height, lineSpacing, lineHeight;
    switch (textObjectType) {
        case TextType:
        case TagTextType:
            height = textObject.height - textObject.padding.top - textObject.padding.bottom;
            lineSpacing = textObject.lineSpacing;
            lineHeight = textObject.style.metrics.fontSize + textObject.style.strokeThickness;
            break;

        case BitmapTextType:
            height = textObject.height
            lineSpacing = 0;
            var scale = (textObject.fontSize / textObject.fontData.size);
            lineHeight = textObject.fontData.lineHeight * scale;
            break;
    }

    // height = (lines * (lineHeight + lineSpacing)) - lineSpacing
    return (height - lineSpacing) / (lineHeight + lineSpacing);

}
export default TextHeightToLinesCount;