const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseColorTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.color', 'color');
    var defaultColor;
    parser
        .on('start', function () {
            defaultColor = dynamicText.textStyle.color;
        })
        .on(`+${tagName}`, function (color) {
            dynamicText.textStyle.setColor(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setColor(defaultColor);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setColor(defaultColor);
        })
}

export default OnParseColorTag;