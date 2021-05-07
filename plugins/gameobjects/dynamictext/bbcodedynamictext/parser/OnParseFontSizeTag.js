var OnParseFontSizeTag = function (dynamicText, parser) {
    parser
        .on('+size', function (fontSize) {
            dynamicText.modifyTextStyle({ fontSize: fontSize });
        })
        .on('-size', function () {
            var fontSize = dynamicText.defaultTextStyle.fontSize;
            dynamicText.modifyTextStyle({ fontSize: fontSize });
        })
}

export default OnParseFontSizeTag;