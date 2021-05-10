var OnParseStrokeColorTag = function (dynamicText, parser) {
    var defaultStroke;
    parser
        .on('start', function () {
            defaultStroke = dynamicText.textStyle.stroke;
            dynamicText.textStyle.setStrokeStyle(null);
        })
        .on('+stroke', function (color) {
            if (color === undefined) {
                color = defaultStroke;
            }
            dynamicText.textStyle.setStrokeStyle(color);
            parser.skipEvent();
        })
        .on('-stroke', function () {
            dynamicText.textStyle.setStrokeStyle(null);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setStrokeStyle(defaultStroke);
        })
}

export default OnParseStrokeColorTag;