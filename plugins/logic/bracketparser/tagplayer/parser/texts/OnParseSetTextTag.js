var IsSetTextTag = function (tags, prefix) {
    // text.name.text
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'text');
}

var OnParseSetTextTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name.text]
            var tags = tag.split('.');
            var name;
            if (IsSetTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }

            // Set text in content section

            parser.skipEvent();
        })
        .on('content', function (content) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            if (content === '\n') {
                return;
            }

            // [text.name.text]
            var tags = parser.lastTagStart.split('.');
            var name;
            if (IsSetTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }

            content = content.replaceAll('\\n', '\n');

            tagPlayer.textManager.setText(name, content);

            parser.skipEvent();
        })
}

export default OnParseSetTextTag;