var OnParseContentOn = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'content.on';
    parser
        .on(`+${tagName}`, function() {
            parser.setContentOutputEnable();
            parser.skipEvent();
        })
}

export default OnParseContentOn;