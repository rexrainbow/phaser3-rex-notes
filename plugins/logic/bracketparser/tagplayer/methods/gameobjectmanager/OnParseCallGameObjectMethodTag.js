var IsCallMethodTag = function (tags, prefix) {
    // prefix.name.methodName
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseCallGameObjectMethodTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name.methodName=value0,value1,value2...]
            var tags = tag.split('.');
            var name, methodName;
            if (IsCallMethodTag(tags, prefix)) {
                name = tags[1];
                methodName = tags[2];
            } else {
                return;
            }

            var methodEventName = `${prefix}.${methodName}`;
            tagPlayer.emit(
                methodEventName,
                name, ...parameters
            );
            if (tagPlayer.listenerCount(methodEventName) > 0) {
                parser.skipEvent();
                return;
            }

            if (!gameObjectManager.hasMethod(name, methodName)) {
                return;
            }
            gameObjectManager.call(name, methodName, ...parameters);

            parser.skipEvent();
            // Will block SetGameObjectPropertyTag callback
        })
}

export default OnParseCallGameObjectMethodTag;