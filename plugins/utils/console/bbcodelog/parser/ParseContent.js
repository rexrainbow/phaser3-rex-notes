var ParseContent = function (parser) {
    parser
        .on('content', function (content) {
            parser.addContent(content);
        })
}

export default ParseContent;