var IsCallMethodTag = function (tags, prefix) {
    // sprite.name.methodName
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseCallSpriteMethodTag = function (tagPlayer, parser, config) {
    var prefix = 'sprite';
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.methodName=value0,value1,value2...]
            var tags = tag.split('.');
            var name, methodName;
            if (IsCallMethodTag(tags, prefix)) {
                name = tags[1];
                methodName = tags[2];
            } else {
                return;
            }

            var methodEventName = `sprite.${methodName}`;
            tagPlayer.emit(
                methodEventName,
                name, ...parameters
            );
            if (tagPlayer.listenerCount(methodEventName) > 0) {
                parser.skipEvent();
                return;
            }

            if (!tagPlayer.spriteManager.hasMethod(name, methodName)) {
                return;
            }
            tagPlayer.spriteManager.call(name, methodName, ...parameters);

            parser.skipEvent();
            // Will block SetSpritePropertyTag callback
        })
}

export default OnParseCallSpriteMethodTag;