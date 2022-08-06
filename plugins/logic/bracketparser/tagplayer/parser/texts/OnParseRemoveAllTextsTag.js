var OnParseRemoveAllTextsTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    parser
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/text]
            if (tag === prefix) {
            } else {
                return;
            }

            tagPlayer.textManager.removeAll();
            parser.skipEvent();
        })
}

export default OnParseRemoveAllTextsTag;