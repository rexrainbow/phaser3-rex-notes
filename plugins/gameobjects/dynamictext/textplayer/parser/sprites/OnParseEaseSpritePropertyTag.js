import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var EaseMode = {
    to: true,
    yoyo: true
}

var IsEasePropertyTag = function (tags, prefix) {
    // sprite.name.prop.to, or sprite.name.prop.yoyo
    return (tags.length === 4) && (tags[0] === prefix) && EaseMode[tags[3]];
}

var OnParseEaseSpritePropertyTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, value, duration, ease) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.prop.to=value,duration,ease]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
                isYoyo = (tags[3] === 'yoyo');
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.ease',               // name
                EaseProperty,                // callback
                [
                    name, property, value,
                    duration, ease, isYoyo
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