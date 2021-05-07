var OnParseColorTag = function (dynamicText, parser) {
    parser
        .on('+color', function (color) {
            dynamicText.modifyTextStyle({ color: color });
        })
        .on('-color', function () {
            var color = dynamicText.defaultTextStyle.color;
            dynamicText.modifyTextStyle({ color: color });
        })
}

export default OnParseColorTag;