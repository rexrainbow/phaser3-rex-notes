var OnParseCustomTag = function(tagPlayer?: any, parser?: any, config?: any) {
    parser
        .on('+', function(tagName?: any, ...params) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            tagPlayer.emit(`+${tagName}`, parser, ...params);
        })
        .on('-', function(tagName?: any) {
            if (parser.skipEventFlag) {
                return;
            }

            tagPlayer.emit(`-${tagName}`, parser);
        })
}

export default OnParseCustomTag;