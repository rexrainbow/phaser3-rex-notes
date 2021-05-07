var OnParseItalicTag = function (dynamicText, parser) {
    parser
        .on('+i', function () {
            dynamicText.modifyTextStyle({ italic: true });
        })
        .on('-i', function () {
            dynamicText.modifyTextStyle({ italic: false });
        })
}

export default OnParseItalicTag;