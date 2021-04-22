import { TextType, TagTextType, BitmapTextType } from './TextObjectTypes.js';

var SetText = function (text) {
    if (text !== undefined) {
        this.text = text;
    }

    // Wrap content in lines
    switch (this.textObjectType) {
        case TextType:
            this.lines = this.textObject.getWrappedText(this.text); // Array of string
            this.linesCount = this.lines.length;
            break;
        case TagTextType:
            this.lines = this.textObject.getPenManager(this.text, this.lines); // Pens-manager
            this.linesCount = this.lines.linesCount;
            break;
        case BitmapTextType:
            this.lines = this.textObject
                .setText(this.text)
                .getTextBounds().wrappedText.split('\n');
            this.linesCount = this.lines.length;
            break;
    }
    // Re-calculate these values later
    this._textHeight = undefined;
    this._textVisibleHeight = undefined;

    this.updateTextObject();
    return this;
}
export default SetText;