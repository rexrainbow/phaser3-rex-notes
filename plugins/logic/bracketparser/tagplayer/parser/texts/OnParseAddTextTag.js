var IsAddTextTag = function (tags, prefix) {
    // text.name
    return (tags.length === 2) && (tags[0] === prefix)
}

var OnParseAddTextTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag, ...args) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name], or [text.name=bbcodetext]
            var tags = tag.split('.');
            var name;
            if (IsAddTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.textManager.add(name, ...args);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/text.name]
            var tags = tag.split('.');
            var name;
            if (IsAddTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.textManager.remove(name);

            parser.skipEvent();
        })
}

export default OnParseAddTextTag;