import FontSizeResize from '../../../../plugins/utils/text/fontsizeresize/FontSizeResize.js';

var FontSizeExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject._minWidth = minWidth;

    textObject.runWidthWrap = function (width) {
        FontSizeResize(textObject, width);
        return textObject;
    }
    textObject.resize = function(width, height) {
        // Font size is set under runWidthWrap/FontSizeResize
        textObject.setFixedSize(width, height);
        return textObject;
    }

    return textObject;
}

export default FontSizeExpandText;