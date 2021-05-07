var OnParseStrokeColorTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.textStyle.setStrokeStyle(false);
        })
        .on('+stroke', function (color) {
            if (color === undefined) {
                color = dynamicText.defaultTextStyle.stroke;
            }
            dynamicText.textStyle.setStrokeStyle(color);
        })
        .on('-stroke', function () {
            dynamicText.textStyle.setStrokeStyle(null);
        })
}

export default OnParseStrokeColorTag;