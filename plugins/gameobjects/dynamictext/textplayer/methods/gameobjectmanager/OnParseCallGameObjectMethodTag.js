import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsCallMethodTag = function (tags, goType) {
    // goType.name.methodName
    return (tags.length === 3) && (tags[0] === goType);
}

var OnParseCallGameObjectMethodTag = function (textPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.methodName=value0,value1,value2...]
            var tags = tag.split('.');
            var name, methodName;
            if (IsCallMethodTag(tags, goType)) {
                name = tags[1];
                methodName = tags[2];
            } else {
                return;
            }

            var methodEventName = `${goType}.${methodName}`;
            textPlayer.emit(
                methodEventName,
                name, ...parameters
            );
            if (textPlayer.listenerCount(methodEventName) > 0) {
                parser.skipEvent();
                return;
            }

            if (!gameObjectManager.hasMethod(name, methodName)) {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.call`,                          // name
                CallMethod,                                // callback
                [goType, name, methodName, ...parameters], // params
                textPlayer,                                // scope
            );

            parser.skipEvent();
            // Will block SetGameObjectPropertyTag callback
        })
}

var CallMethod = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.call(...args);
}

export default OnParseCallGameObjectMethodTag;