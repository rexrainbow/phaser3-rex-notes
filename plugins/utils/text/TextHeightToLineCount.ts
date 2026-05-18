import {
    TextType, TagTextType, BitmapTextType
} from './GetTextObjectType';
import GetTextObjectType from './GetTextObjectType';

var TextHeightToLineCount = function(textObject?: any) {
    var textObjectType = GetTextObjectType(textObject);
    var height, lineSpacing, lineHeight;
    switch (textObjectType?: any) {
        case TextType:
            height = textObject.height - textObject.padding.top - textObject.padding.bottom;
            lineSpacing = textObject.lineSpacing;
            lineHeight = textObject.style.metrics.fontSize + textObject.style.strokeThickness;
            break;

        case TagTextType: // + fixedLineHeightMode: true
            height = textObject.height - textObject.padding.top - textObject.padding.bottom;
            lineSpacing = textObject.lineSpacing;
            lineHeight = textObject.style.metrics.fontSize;
            break;

        case BitmapTextType:
            height = textObject.height;
            lineSpacing = 0;
            var scale = (textObject.fontSize / textObject.fontData.size);
            lineHeight = textObject.fontData.lineHeight * scale;
            break;
    }

    // height = (lines * (lineHeight + lineSpacing)) - lineSpacing
    return (height + lineSpacing) / (lineHeight + lineSpacing);

}
export default TextHeightToLineCount;