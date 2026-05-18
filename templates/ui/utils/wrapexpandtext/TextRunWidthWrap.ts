import IsTextGameObject from '../../../../plugins/utils/text/IsTextGameObject';

var TextRunWidthWrap = function(textObject?: any) {
    var RunWidthWrap = function(width?: any) {
        var padding = textObject.padding;
        var wrapWidth = width - ((padding.left + padding.right) * textObject.scaleX);
        var style = textObject.style;
        if (IsTextGameObject(textObject)) {
            style.wordWrapWidth = wrapWidth;
            style.maxLines = 0;
        } else {  // BBCode text, Tag text
            if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
                style.wrapMode = 1;
            }
            style.wrapWidth = wrapWidth;
            style.maxLines = 0;
        }
        style.fixedWidth = width;
        style.fixedHeight = 0;
        textObject.updateText();  // Redraw text

        textObject.minHeight = textObject.height;
        return textObject;
    }
    return RunWidthWrap;
}

export default TextRunWidthWrap;