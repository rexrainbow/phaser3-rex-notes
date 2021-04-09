import TextHeightToLinesCount from './TextHeightToLinesCount.js';

var ResizeText = function (textObject, width, height) {
    height += this.textLineHeight + this.textLineSpacing; // Add 1 text line
    if ((textObject.width === width) && (textObject.height === height)) {
        return;
    }

    textObject.setFixedSize(width, height);

    var style = textObject.style;
    var wrapWidth = Math.max(width, 0);

    var maxLines = Math.ceil(TextHeightToLinesCount.call(this, height)) + 1;

    if (this.textObjectType === 0) {  // Built-in text
        style.wordWrapWidth = wrapWidth;
        style.maxLines = maxLines;
    } else {  // BBCode text, Tag text
        if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
            style.wrapMode = 1;
        }
        style.wrapWidth = wrapWidth;
        style.maxLines = maxLines;
    }

    // Render content again
    this.setText();
}

export default ResizeText;