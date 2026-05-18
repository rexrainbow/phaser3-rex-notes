var OnParseContentOff = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'content.off';
    parser
        .on(`+${tagName}`, function() {
            parser.setContentOutputEnable(false);
            parser.skipEvent();
        })
}

export default OnParseContentOff;