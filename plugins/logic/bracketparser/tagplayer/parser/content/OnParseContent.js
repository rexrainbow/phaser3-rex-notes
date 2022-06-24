var OnParseContent = function (tagPlayer, parser, config) {
    parser
        .on('content', function (content) {
            if (content === '\n') {
                return;
            }
            var startTag = `+${parser.lastTagStart}`;
            tagPlayer.emit(`${startTag}#content`, parser, content);
        })
}

export default OnParseContent;