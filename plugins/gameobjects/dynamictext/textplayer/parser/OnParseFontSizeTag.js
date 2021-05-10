var OnParseFontSizeTag = function (dynamicText, parser) {
    var defaultFontSize;
    parser
        .on('start', function () {
            defaultFontSize = dynamicText.textStyle.fontSize;
        })
        .on('+size', function (fontSize) {
            dynamicText.textStyle.setFontSize(fontSize);
            parser.skipEvent();
        })
        .on('-size', function () {
            dynamicText.textStyle.setFontSize(defaultFontSize);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setFontSize(defaultFontSize);
        })
}

export default OnParseFontSizeTag;