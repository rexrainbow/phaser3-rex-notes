const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseShadowColorTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.shadow', 'shadow');
    var defaultShadowColor;
    parser
        .on('start', function () {
            defaultShadowColor = dynamicText.textStyle.shadowColor;
            dynamicText.textStyle.setShadowColor(null);
        })
        .on(`+${tagName}`, function (color) {
            if (color === undefined) {
                color = defaultShadowColor;
            }
            dynamicText.textStyle.setShadowColor(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setShadowColor(null);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setShadowColor(defaultShadowColor);
        })
}

export default OnParseShadowColorTag;