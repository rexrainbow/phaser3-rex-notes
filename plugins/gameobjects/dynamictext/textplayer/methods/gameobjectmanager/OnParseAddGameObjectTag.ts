import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var IsAddGameObjectTag = function(tags?: any, goType?: any) {
    // goType.name
    return (tags.length === 2) && (tags[0] === goType)
}

var OnParseAddGameObjectTag = function(textPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    parser
        .on('+', function(tag?: any, ...args) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name=key,frame], or [goType.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.add`,          // name
                AddGameObject,            // callback
                [goType, name, ...args],  // params
                textPlayer,               // scope
            );

            parser.skipEvent();
        })
        .on('-', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.remove`, // name
                RemoveGameObject,   // callback
                [goType, name],     // params
                textPlayer,         // scope
            );

            parser.skipEvent();
        })
}

var AddGameObject = function(params?: any) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.add(...args);
}

var RemoveGameObject = function(params?: any) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.remove(...args);
}

export default OnParseAddGameObjectTag;