var OnParseColorTag = function (dynamicText, parser) {
    parser
        .on('+color', function (color) {
            dynamicText.textStyle.setColor(color);
        })
        .on('-color', function () {
            var color = dynamicText.defaultTextStyle.color;
            dynamicText.textStyle.setColor(color);
        })
}

export default OnParseColorTag;