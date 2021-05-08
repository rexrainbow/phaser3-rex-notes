var OnParseItalicTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.textStyle.setItalic(false);
        })
        .on('+i', function () {
            dynamicText.textStyle.setItalic(true);
        })
        .on('-i', function () {
            dynamicText.textStyle.setItalic(false);
        })
}

export default OnParseItalicTag;