var IsSetPropertyTag = function (tags, goType) {
    // goType.name.prop
    return (tags.length === 3) && (tags[0] === goType);
}

var OnParseSetGameObjectPropertyTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if (IsSetPropertyTag(tags, goType)) {
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