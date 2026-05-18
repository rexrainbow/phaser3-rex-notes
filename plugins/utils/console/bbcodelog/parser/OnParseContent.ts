var ParseContent = function(parser?: any) {
    parser
        .on('content', function(content?: any) {
            parser.addContent(content);
            parser.skipEvent();
        })
        .on('+', function() {
            parser.addContent(parser.lastTagSource);
            parser.skipEvent();
        })
        .on('-', function() {
            parser.addContent(parser.lastTagSource);
            parser.skipEvent();
        })
}

export default ParseContent;