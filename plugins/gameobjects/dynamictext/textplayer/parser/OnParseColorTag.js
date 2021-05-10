var OnParseColorTag = function (dynamicText, parser) {
    var defaultColor;
    parser
        .on('start', function () {
            defaultColor = dynamicText.textStyle.color;
        })
        .on('+color', function (color) {
            dynamicText.textStyle.setColor(color);
            parser.skipEvent();
        })
        .on('-color', function () {
            dynamicText.textStyle.setColor(defaultColor);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setColor(defaultColor);
        })
}

export default OnParseColorTag;