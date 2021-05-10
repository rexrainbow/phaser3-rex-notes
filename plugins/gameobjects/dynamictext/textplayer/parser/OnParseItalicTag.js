var OnParseItalicTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.textStyle.setItalic(false);
        })
        .on('+i', function () {
            dynamicText.textStyle.setItalic(true);
            parser.skipEvent();
        })
        .on('-i', function () {
            dynamicText.textStyle.setItalic(false);
            parser.skipEvent();
        })
}

export default OnParseItalicTag;