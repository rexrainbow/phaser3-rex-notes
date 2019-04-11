import TextHeightToLinesCount from './TextHeightToLinesCount.js';

var ResizeText = function (textObject, width, height) {
    textObject.setFixedSize(width, height);

    var style = textObject.style;
    var wrapWidth = Math.max(width, 0);

    var maxLines = Math.ceil(TextHeightToLinesCount.call(this, height)) + 1;

    var isChanged;
    if (this.textObjectType === 0) {
        isChanged = (style.wordWrapWidth !== wrapWidth) || (style.maxLines !== maxLines);
        style.wordWrapWidth = wrapWidth;
        style.maxLines = maxLines;
    } else {
        isChanged = (style.wrapWidth !== wrapWidth) || (style.maxLines !== maxLines);
        style.wrapWidth = wrapWidth;
        style.maxLines = maxLines;
    }

    // Render content again
    if (isChanged) {
        this.setText();
    }
}

export default ResizeText;