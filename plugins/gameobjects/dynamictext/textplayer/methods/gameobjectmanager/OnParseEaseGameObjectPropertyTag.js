import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var EaseMode = {
    to: true, yoyo: true
}

var IsEasePropertyTag = function (tags, goType) {
    // goType.name.prop.to
    return (tags.length === 4) && (tags[0] === goType) && EaseMode[tags[3]];
}

var OnParseEaseGameObjectPropertyTag = function (textPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.prop.to=value,duration]
            // [goType.name.prop.to=value,duration,ease,repeat]
            // [goType.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, goType)) {
                name = tags[1];
                property = tags[2];
                isYoyo = (tags[3] === 'yoyo');
            } else {
                return;
            }

            if (typeof (ease) === 'number') {
                repeat = ease;
                ease = undefined;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.ease`,                    // name
                EaseProperty,                        // callback
                [
                    goType,
                    name, property, value,
                    duration, ease, repeat, isYoyo
                ],                                    // params
                textPlayer,                           // scope
            );

            parser.skipEvent();
        })
}

var EaseProperty = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.easeProperty(...args);
}

export default OnParseEaseGameObjectPropertyTag;