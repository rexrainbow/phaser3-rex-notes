var ParseContent = function (parser) {
    parser
        .on('content', function (content) {
            parser.addContent(content);
            parser.skipEvent();
        })
        .on('+', function () {
            parser.addContent(parser.lastTagSource);
            parser.skipEvent();
        })
        .on('-', function () {
            parser.addContent(parser.lastTagSource);
            parser.skipEvent();
        })
}

export default ParseContent;