import { TextType, TagTextType, BitmapTextType } from '../../../../plugins/utils/system/GetTextObjectType.js'

var DisplayVisibleText = function (text) {

    switch (this.textObjectType) {
        case TextType:
            // Store wrap properties
            var style = this.textObject.style;
            var wordWrapWidth = style.wordWrapWidth;
            var wordWrapCallback = style.wordWrapCallback;
            // Disable wrap
            style.wordWrapWidth = 0;
            style.wordWrapCallback = undefined;
            // Set text
            this.textObject.setText(text);
            // Restore wrap
            style.wordWrapWidth = wordWrapWidth;
            style.wordWrapCallback = wordWrapCallback;
            break;

        case TagTextType:
            // Store wrap properties
            var style = this.textObject.style;
            var wrapMode = style.wrapMode;
            // Disable wrap
            style.wrapMode = 0;
            // Set text
            this.textObject.setText(text);
            // Restore wrap
            style.wrapMode = wrapMode;
            break;

        case BitmapTextType:
            // Store wrap properties
            var maxWidth = this.textObject._maxWidth;
            // Disable wrap
            this.textObject._maxWidth = 0;
            // Set text
            this.textObject.setText(text);
            // Restore wrap
            this.textObject._maxWidth = maxWidth;
            break;
    }
}

export default DisplayVisibleText;