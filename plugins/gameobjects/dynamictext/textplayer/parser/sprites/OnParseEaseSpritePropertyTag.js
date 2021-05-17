import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseEaseSpritePropertyTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    parser
        .on(`+`, function (tag, value, duration, ease) {
            // [sprite.name.prop.to=value,duration,ease]
            var tags = tag.split('.');
            var name, property;
            if ((tags.length === 4) && (tags[0] === prefix) && (tags[3] === 'to')) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.ease',                              // name
                EaseProperty,                               // callback
                [name, property, value, duration, ease],    // params
                textPlayer,                                 // scope
            );
        })
}

var EaseProperty = function (params) {
    var name = params[0];
    var property = params[1];
    var value = params[2];
    var duration = params[3];
    var ease = params[4]
    this.spriteManager.easeProperty(name, property, value, duration, ease);  // this: textPlayer
}

export default OnParseEaseSpritePropertyTag;