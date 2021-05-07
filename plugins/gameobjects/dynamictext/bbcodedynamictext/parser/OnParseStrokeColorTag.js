var OnParseStrokeColorTag = function (dynamicText, parser) {
    parser
        .on('+stroke', function (color) {
            dynamicText.modifyTextStyle({ stroke: color });
        })
        .on('-stroke', function () {
            dynamicText.modifyTextStyle({ stroke: null });
        })
}

export default OnParseStrokeColorTag;