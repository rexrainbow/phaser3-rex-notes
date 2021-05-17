import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseAddSpriteTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    parser
        .on('+', function (tag, textureKey, frameKey) {
            // [sprite.name=key,frame]
            var tags = tag.split('.');
            var name;
            if ((tags.length === 2) && (tags[0] === prefix)) {
                name = tags[1];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.add',                   // name
                AddSprite,                      // callback
                [name, textureKey, frameKey],   // params
                textPlayer,                     // scope
            );
        })
        .on('-', function (tag) {
            // [/sprite.name]
            var tags = tag.split('.');
            var name;
            if ((tags.length === 2) && (tags[0] === prefix)) {
                name = tags[1];
            } else {
                return;
            }
            AppendCommandBase.call(textPlayer,
                'sprite.remove',   // name
                RemoveSprite,      // callback
                name,              // params
                textPlayer,        // scope
            );
        })
}

var AddSprite = function (params) {
    var name = params[0];
    var textureKey = params[1];
    var frameKey = params[2];
    this.spriteManager.add(name, textureKey, frameKey);  // this: textPlayer
}

var RemoveSprite = function (name) {
    this.spriteManager.remove(name);
}

export default OnParseAddSpriteTag;