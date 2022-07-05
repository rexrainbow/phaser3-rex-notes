var IsSetPropertyTag = function (tags, prefix) {
    // text.name.prop
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseSetTextPropertyTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if (IsSetPropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            tagPlayer.textManager.setProperty(name, property, value);

            parser.skipEvent();
        })
}

export default OnParseSetTextPropertyTag;