import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsSetPropertyTag = function (tags, goType) {
    // goType.name.prop
    return (tags.length === 3) && (tags[0] === goType);
}

var OnParseSetGameObjectPropertyTag = function (textPlayer, parser, config) {
    var goType = config.name;
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

            AppendCommandBase.call(textPlayer,
                `${goType}.set`,                 // name
                SetProperty,                     // callback
                [goType, name, property, value], // params
                textPlayer,                      // scope
            );

            parser.skipEvent();
        })
}

var SetProperty = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.setProperty(...args);
}

export default OnParseSetGameObjectPropertyTag;