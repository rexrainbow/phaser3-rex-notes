import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSetSpritePropertyTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    parser
        .on(`+`, function (tag, value) {
            // [sprite.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if ((tags.length === 3) && (tags[0] === prefix)) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.set',                   // name
                SetProperty,                    // callback
                [name, property, value],        // params
                textPlayer,                     // scope
            );
        })
}

var SetProperty = function (params) {
    var name = params[0];
    var property = params[1];
    var value = params[2];
    this.spriteManager.setProperty(name, property, value);  // this: textPlayer
}

export default OnParseSetSpritePropertyTag;