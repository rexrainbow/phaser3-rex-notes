var OnParseStrokeColorTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'stroke';
    var defaultStroke;
    parser
        .on('start', function() {
            defaultStroke = textPlayer.textStyle.stroke;
            textPlayer.textStyle.setStrokeStyle(null);
        })
        .on(`+${tagName}`, function(color?: any) {
            if (color === undefined) {
                color = defaultStroke;
            }
            textPlayer.textStyle.setStrokeStyle(color);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            textPlayer.textStyle.setStrokeStyle(null);
            parser.skipEvent();
        })
        .on('complete', function() {
            textPlayer.textStyle.setStrokeStyle(defaultStroke);
        })
}

export default OnParseStrokeColorTag;