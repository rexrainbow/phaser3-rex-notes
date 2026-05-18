var OnParseShadowColorTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'shadow';
    var defaultShadowColor;
    parser
        .on('start', function() {
            defaultShadowColor = textPlayer.textStyle.shadowColor;
            textPlayer.textStyle.setShadowColor(null);
        })
        .on(`+${tagName}`, function(color?: any) {
            if (color === undefined) {
                color = defaultShadowColor;
            }
            textPlayer.textStyle.setShadowColor(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            textPlayer.textStyle.setShadowColor(null);
            parser.skipEvent();
        })
        .on('complete', function() {
            textPlayer.textStyle.setShadowColor(defaultShadowColor);
        })
}

export default OnParseShadowColorTag;