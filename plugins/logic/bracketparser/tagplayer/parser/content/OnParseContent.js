var OnParseContent = function (tagPlayer, parser, config) {
    parser
        .on('content', function (content) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            if (content === '\n') {
                return;
            }

            content = content.replaceAll('\\n', '\n');

            if (tagPlayer.contentCallback) {
                tagPlayer.contentCallback(content);
                parser.skipEvent();
                return;
            }

            var startTag = `+${parser.lastTagStart}`;
            tagPlayer.emit(`${startTag}#content`, parser, content);
        })
}

export default OnParseContent;