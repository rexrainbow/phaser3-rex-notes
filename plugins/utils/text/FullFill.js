var FullFill = function (textObject, width, height) {
    textObject.setFixedSize(width, height);
    // Remove padding
    var padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    var style = textObject.style;
    // Set wrap width
    if (width < 0) {
        width = 0;
    }
    if (style.hasOwnProperty('wordWrapWidth')) {
        style.wordWrapWidth = width;
    } else {
        style.wrapWidth = width;
    }

    // Set max lines
    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    var lineHeight = style.metrics.fontSize + style.strokeThickness;
    var lineSpacing = textObject.lineSpacing;
    var maxLines = Math.floor((height - lineSpacing) / (lineHeight + lineSpacing));
    if (maxLines < 0) {
        maxLines = 0;
    }
    style.maxLines = maxLines;

    // Redraw text
    textObject.updateText();
}
export default FullFill;