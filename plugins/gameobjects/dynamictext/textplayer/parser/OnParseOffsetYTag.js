const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseOffsetYTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.y', 'y');
    var defaultOffsetY;
    parser
        .on('start', function () {
            defaultOffsetY = dynamicText.textStyle.offsetY;
            dynamicText.textStyle.setOffsetY(0);
        })
        .on(`+${tagName}`, function (y) {
            if (y === undefined) {
                y = defaultOffsetY;
            }
            dynamicText.textStyle.setOffsetY(y);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setOffsetY(0);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setOffsetY(0);
        })
}

export default OnParseOffsetYTag;