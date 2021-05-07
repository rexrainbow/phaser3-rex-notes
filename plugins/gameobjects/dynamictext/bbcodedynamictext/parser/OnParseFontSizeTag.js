var OnParseFontSizeTag = function (dynamicText, parser) {
    parser
        .on('+size', function (fontSize) {
            dynamicText.textStyle.setFontSize(fontSize);
        })
        .on('-size', function () {
            var fontSize = dynamicText.defaultTextStyle.fontSize;
            dynamicText.textStyle.setFontSize(fontSize);
        })
}

export default OnParseFontSizeTag;