var OnParseRemoveAllGameObjectsTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/prefix]
            if (tag === prefix) {
            } else {
                return;
            }

            gameObjectManager.removeAll();
            parser.skipEvent();
        })
}

export default OnParseRemoveAllGameObjectsTag;