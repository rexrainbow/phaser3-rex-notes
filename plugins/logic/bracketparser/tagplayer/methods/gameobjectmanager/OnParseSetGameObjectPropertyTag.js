var IsSetPropertyTag = function (tags, prefix) {
    // prefix.name.prop
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseSetGameObjectPropertyTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on(`+`, function (tag, value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if (IsSetPropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            gameObjectManager.setProperty(name, property, value);

            parser.skipEvent();
        })
}

export default OnParseSetGameObjectPropertyTag;