var DynamicTextRunWidthWrap = function(textObject?: any) {
    var RunWidthWrap = function(width?: any) {
        textObject
            .setFixedSize(width, 0)
            .runWordWrap();

        textObject.minHeight = textObject.height;
        return textObject;
    }
    return RunWidthWrap;
}

export default DynamicTextRunWidthWrap;