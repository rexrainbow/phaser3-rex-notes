var OnParseLeftSpaceTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'left';
    var defaultLeftSpace;
    parser
        .on('start', function() {
            defaultLeftSpace = textPlayer.textStyle.leftSpace;
            textPlayer.textStyle.setLeftSpace(0);
        })
        .on(`+${tagName}`, function(space?: any) {
            if (space === undefined) {
                space = defaultLeftSpace;
            }
            textPlayer.textStyle.setLeftSpace(space);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            textPlayer.textStyle.setLeftSpace(0);
            parser.skipEvent();
        })
        .on('complete', function() {
            textPlayer.textStyle.setLeftSpace(0);
        })
}

export default OnParseLeftSpaceTag;