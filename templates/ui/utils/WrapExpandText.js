import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';
import IsBitmapTextGameObject from '../../../plugins/utils/bitmaptext/IsBitmapTextGameObject.js';

var WrapExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject.minWidth = minWidth;

    if (IsBitmapTextGameObject(textObject)) {
        // Bitmap text
        textObject.runWidthWrap = (function (width) {
            textObject.setMaxWidth(width);
            return this;
        }).bind(textObject);
    } else {
        // Text, BBCodeText, TagText
        textObject.runWidthWrap = (function (width) {
            var padding = this.padding;
            var wrapWidth = width - padding.left - padding.right;
            var style = textObject.style;
            if (IsTextGameObject(this)) {
                style.wordWrapWidth = wrapWidth;
                style.maxLines = 0;
            } else {  // BBCode text, Tag text
                if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
                    style.wrapMode = 1;
                }
                style.wrapWidth = wrapWidth;
                style.maxLines = 0;
            }

            this.setFixedSize(width, 0);  // Redraw text
            return this;
        }).bind(textObject);
    }

    return textObject;
}

export default WrapExpandText;