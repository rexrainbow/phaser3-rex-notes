var IsAddGameObjectTag = function (tags, prefix) {
    // prefix.name
    return (tags.length === 2) && (tags[0] === prefix)
}

var OnParseAddGameObjectTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on('+', function (tag, ...args) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name=key,frame], or [prefix.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, prefix)) {
                name = tags[1];                
            } else {
                return;
            }
            args.push(tagPlayer);
            gameObjectManager.add(name, ...args);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/prefix.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, prefix)) {
                name = tags[1];                
            } else {
                return;
            }
            gameObjectManager.remove(name);

            parser.skipEvent();
        })
}

export default OnParseAddGameObjectTag;