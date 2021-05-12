const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseOffsetYTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.y', 'y');
    var defaultOffsetY;
    parser
        .on('start', function () {
            defaultOffsetY = textPlayer.textStyle.offsetY;
            textPlayer.textStyle.setOffsetY(0);
        })
        .on(`+${tagName}`, function (y) {
            if (y === undefined) {
                y = defaultOffsetY;
            }
            textPlayer.textStyle.setOffsetY(y);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setOffsetY(0);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.textStyle.setOffsetY(0);
        })
}

export default OnParseOffsetYTag;