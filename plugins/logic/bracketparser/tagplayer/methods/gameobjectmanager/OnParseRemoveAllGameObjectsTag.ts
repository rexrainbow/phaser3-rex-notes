var OnParseRemoveAllGameObjectsTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on('-', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType]
            if (tag === goType) {
            } else {
                return;
            }

            gameObjectManager.removeAll();
            parser.skipEvent();
        })
}

export default OnParseRemoveAllGameObjectsTag;