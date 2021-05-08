var OnParseShadowColorTag = function (dynamicText, parser) {
    var defaultShadowColor;
    parser
        .on('start', function () {
            defaultShadowColor = dynamicText.textStyle.shadowColor;
            dynamicText.textStyle.setShadowColor(null);
        })
        .on('+shadow', function (color) {
            if (color === undefined) {
                color = defaultShadowColor;
            }
            dynamicText.textStyle.setShadowColor(color);
        })
        .on('-shadow', function () {
            dynamicText.textStyle.setShadowColor(null);
        })
        .on('complete', function () {
            dynamicText.textStyle.setShadowColor(defaultShadowColor);
        })
}

export default OnParseShadowColorTag;