var FullFill = function (textObject, width, height) {
    textObject.setFixedSize(width, height);
    // Remove padding
    var padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    var style = textObject.style;
    // Set wrap width
    style.wordWrapWidth = Math.max(width, 0);

    // Set max lines    
    var lineHeight = style.metrics.fontSize + style.strokeThickness;
    var lineSpacing = textObject.lineSpacing;
    var maxLines = Math.floor((height - lineSpacing) / (lineHeight + lineSpacing));
    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    textObject.setMaxLines(Math.max(maxLines, 0)); // Also redraw text
}
export default FullFill;