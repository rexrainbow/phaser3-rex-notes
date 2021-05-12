const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseStrokeColorTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.stroke', 'stroke');
    var defaultStroke;
    parser
        .on('start', function () {
            defaultStroke = dynamicText.textStyle.stroke;
            dynamicText.textStyle.setStrokeStyle(null);
        })
        .on(`+${tagName}`, function (color) {
            if (color === undefined) {
                color = defaultStroke;
            }
            dynamicText.textStyle.setStrokeStyle(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setStrokeStyle(null);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setStrokeStyle(defaultStroke);
        })
}

export default OnParseStrokeColorTag;