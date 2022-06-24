var OnParseCustomTag = function (tagPlayer, parser, config) {
    parser
        .on('start', function () {
            tagPlayer.emit('parser.start', parser);
        })
        .on('+', function (tagName, ...value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            var startTag = `+${tagName}`;
            tagPlayer.emit(`${startTag}`, parser, ...value);
        })
        .on('-', function (tagName) {
            if (parser.skipEventFlag) {
                return;
            }

            var endTag = `-${tagName}`;
            tagPlayer.emit(`${endTag}`, parser);
        })
        .on('complete', function () {
            tagPlayer.emit('parser.complete', parser);
        })
}

export default OnParseCustomTag;