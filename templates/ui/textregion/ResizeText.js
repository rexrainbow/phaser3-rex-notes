import IsTextGameObject from '../../../plugins/utils/object/IsTextGameObject.js';

var ResizeText = function (textObject, width, height) {
    if (IsTextGameObject(textObject)) {
        ResizeTextObject(textObject, width, height)
    }
}

var ResizeTextObject = function (textObject, width, height) {
    // Remove padding
    var padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    var style = textObject.style;
    // Set wrap width
    style.wordWrapWidth = width;

    // Set max lines    
    var lineHeight = style.metrics.fontSize + style.strokeThickness;
    var lineSpacing = textObject.lineSpacing;
    var maxLines = Math.floor((height - lineSpacing) / (lineHeight + lineSpacing));
    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    textObject.setMaxLines(maxLines); // Also redraw text
}
export default ResizeText;