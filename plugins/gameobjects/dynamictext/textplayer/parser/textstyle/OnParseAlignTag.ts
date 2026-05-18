var OnParseAlignTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'align';
    parser
        .on(`+${tagName}`, function(align?: any) {
            textPlayer.textStyle.setAlign(align);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            textPlayer.textStyle.setAlign();
            parser.skipEvent();
        })
        .on('complete', function() {
            textPlayer.textStyle.setAlign();
        })
}

export default OnParseAlignTag;