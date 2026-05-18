var BitmapTextRunWidthWrap = function(textObject?: any) {
    var RunWidthWrap = function(width?: any) {
        textObject.setMaxWidth(width);

        textObject.minHeight = textObject.height;
        return textObject;
    }
    return RunWidthWrap;
}

export default BitmapTextRunWidthWrap;