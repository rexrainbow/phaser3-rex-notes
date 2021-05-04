var DynamicTextRunWidthWrap = function (textObject) {
    var RunWidthWrap = function (width) {
        textObject
            .setFixedSize(width, 0)
            .runWordWrap();
        return textObject;
    }
    return RunWidthWrap;
}

export default DynamicTextRunWidthWrap;