import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var EaseMode = {
    to: true,
    yoyo: true
}

var IsEasePropertyTag = function (tags, prefix) {
    // sprite.name.prop.to, or sprite.name.prop.yoyo
    return (tags.length === 4) && (tags[0] === prefix) && EaseMode[tags[3]];
}

var OnParseEaseSpritePropertyTag = function (textPlayer, parser, config) {
    var prefix = 'sprite';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.prop.to=value,duration]
            // [sprite.name.prop.to=value,duration,ease,repeat]
            // [sprite.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, prefix)) {
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
                'sprite.ease',               // name
                EaseProperty,                // callback
                [
                    name, property, value,
                    duration, ease, repeat, isYoyo
                ],                            // params
                textPlayer,                   // scope
            );
            parser.skipEvent();
        })
}

var EaseProperty = function (params) {
    // this: textPlayer
    this.spriteManager.easeProperty(...params);
}

export default OnParseEaseSpritePropertyTag;