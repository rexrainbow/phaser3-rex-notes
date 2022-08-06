import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsCallSpriteMethodTag = function (tags, prefix) {
    // sprite.name.methodName
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseCallSpriteMethodTag = function (textPlayer, parser, config) {
    var prefix = 'sprite';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.methodName=value0,value1,value2...]
            var tags = tag.split('.');
            var name, methodName;
            if (IsCallSpriteMethodTag(tags, prefix)) {
                name = tags[1];
                methodName = tags[2];
            } else {
                return;
            }
            if (!textPlayer.spriteManager.hasMethod(name, methodName)) {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.call',                     // name
                CallMethod,                        // callback
                [name, methodName, ...parameters], // params
                textPlayer,                        // scope
            );
            parser.skipEvent();
        })
}

var CallMethod = function (params) {
    // this: textPlayer
    this.spriteManager.call(...params);
}

export default OnParseCallSpriteMethodTag;