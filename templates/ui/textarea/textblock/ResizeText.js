import { TextType, TagTextType, BitmapTextType } from '../../../../plugins/utils/text/GetTextObjectType.js'

var ResizeText = function (textObject, width, height) {
    height += (this.textLineHeight + this.textLineSpacing); // Add 1 line
    if ((this.textObjectWidth === width) && (this._textObjectRealHeight === height)) {
        return;
    }
    this.textObjectWidth = width;
    this._textObjectRealHeight = height;

    switch (this.textObjectType) {
        case TextType:
            textObject.setFixedSize(width, height);

            var style = textObject.style;
            var wrapWidth = Math.max(width, 0);
             style.wordWrapWidth = wrapWidth;
            break;
        case BitmapTextType:
            textObject.setMaxWidth(width);
            break;
    }

    // Render content again
    this.setText();
}

export default ResizeText;