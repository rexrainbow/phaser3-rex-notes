import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsAddSpriteTag = function (tags, prefix) {
    // sprite.name
    return (tags.length === 2) && (tags[0] === prefix)
}

var OnParseAddSpriteTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    parser
        .on('+', function (tag, textureKey, frameKey) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name=key,frame], or [sprite.name]
            var tags = tag.split('.');
            if (IsAddSpriteTag(tags, prefix)) {
                var name = tags[1];
                AppendCommandBase.call(textPlayer,
                    'sprite.add',                   // name
                    AddSprite,                      // callback
                    [name, textureKey, frameKey],   // params
                    textPlayer,                     // scope
                );
            } else {
                return;
            }

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite.name]
            var tags = tag.split('.');
            if (IsAddSpriteTag(tags, prefix)) {
                var name = tags[1];
                AppendCommandBase.call(textPlayer,
                    'sprite.remove',   // name
                    RemoveSprite,      // callback
                    name,              // params
                    textPlayer,        // scope
                );
            } else {
                return;
            }

            parser.skipEvent();
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