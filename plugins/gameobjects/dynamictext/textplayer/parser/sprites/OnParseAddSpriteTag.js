import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsAddSpriteTag = function (tags, prefix) {
    // sprite.name
    return (tags.length === 2) && (tags[0] === prefix)
}

var OnParseAddSpriteTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag, ...args) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name=key,frame], or [sprite.name]
            var tags = tag.split('.');
            if (IsAddSpriteTag(tags, prefix)) {
                var name = tags[1];
                AppendCommandBase.call(textPlayer,
                    'sprite.add',      // name
                    AddSprite,         // callback
                    [name, ...args],   // params
                    textPlayer,        // scope
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
    // this: textPlayer
    this.spriteManager.add(...params);
}

var RemoveSprite = function (name) {
    // this: textPlayer
    this.spriteManager.remove(name);
}

export default OnParseAddSpriteTag;