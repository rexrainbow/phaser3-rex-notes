var BitmapTextRunWidthWrap = function (textObject) {
    var RunWidthWrap = function (width) {
        textObject.setMaxWidth(width);
        return textObject;
    }
    return RunWidthWrap;
}

export default BitmapTextRunWidthWrap;