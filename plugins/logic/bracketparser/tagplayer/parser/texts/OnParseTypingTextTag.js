var IsTypingTextTag = function (tags, prefix) {
    // text.name.typing
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'typing');
}

var OnParseTypingTextTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, speed) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name.typing]
            var tags = tag.split('.');
            var name;
            if (IsTypingTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }

            // Set text in content section
            if (speed !== undefined) {
                tagPlayer.textManager.setTypingSpeed(name, speed);
            }

            parser.skipEvent();
        })
        .on('content', function (content) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            if (content === '\n') {
                return;
            }

            // [text.name.typing]
            var tags = parser.lastTagStart.split('.');
            var name;
            if (IsTypingTextTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }

            content = content.replaceAll('\\n', '\n');

            tagPlayer.textManager.typingText(name, content);

            parser.skipEvent();
        })
}

export default OnParseTypingTextTag;