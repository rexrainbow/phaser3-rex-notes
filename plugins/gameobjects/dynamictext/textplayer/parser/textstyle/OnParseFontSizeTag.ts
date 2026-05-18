var OnParseFontSizeTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'size';
    var defaultFontSize;
    parser
        .on('start', function() {
            defaultFontSize = textPlayer.textStyle.fontSize;
        })
        .on(`+${tagName}`, function(fontSize?: any) {
            textPlayer.textStyle.setFontSize(fontSize);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            textPlayer.textStyle.setFontSize(defaultFontSize);
            parser.skipEvent();
        })
        .on('complete', function() {
            textPlayer.textStyle.setFontSize(defaultFontSize);
        })
}

export default OnParseFontSizeTag;