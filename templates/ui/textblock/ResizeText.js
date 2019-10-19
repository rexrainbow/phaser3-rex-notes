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

    if (this.textObjectType === 0) {
        style.wordWrapWidth = wrapWidth;
        style.maxLines = maxLines;
    } else {
        style.wrapWidth = wrapWidth;
        style.maxLines = maxLines;
    }

    // Render content again
    this.setText();
}

export default ResizeText;