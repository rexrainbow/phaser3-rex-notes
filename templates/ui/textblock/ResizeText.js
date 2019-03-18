import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';
import IsCanvasTextGameObject from '../../../plugins/utils/canvastext/IsCanvasTextGameObject.js';

var ResizeText = function (textObject, width, height) {
    textObject.setFixedSize(width, height);
    // Remove padding
    var padding = textObject.padding;
    width -= (padding.left + padding.right);
    height -= (padding.top + padding.bottom);

    var style = textObject.style;
    var wrapWidth = Math.max(width, 0);

    // height = (maxLines * (lineHeight + lineSpacing)) - lineSpacing
    var lineHeight = style.metrics.fontSize + style.strokeThickness;
    var lineSpacing = textObject.lineSpacing;
    var maxLines = Math.ceil((height - lineSpacing) / (lineHeight + lineSpacing));

    if (IsTextGameObject(textObject)) {
        style.wordWrapWidth = wrapWidth;
        style.maxLines = maxLines;
    } else if (IsCanvasTextGameObject(textObject)) {
        style.wrapWidth = wrapWidth;
        style.maxLines = maxLines;
    } else {
        // ??
    }

    textObject.updateText();
}

export default ResizeText;