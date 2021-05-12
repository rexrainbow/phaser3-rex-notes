const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseColorTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.color', 'color');
    var defaultColor;
    parser
        .on('start', function () {
            defaultColor = textPlayer.textStyle.color;
        })
        .on(`+${tagName}`, function (color) {
            textPlayer.textStyle.setColor(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setColor(defaultColor);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setColor(defaultColor);
        })
}

export default OnParseColorTag;