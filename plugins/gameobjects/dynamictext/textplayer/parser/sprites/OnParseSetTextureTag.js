import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var IsSetTextureTag = function (tags, prefix) {
    // sprite.name.texture
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'texture')
}

var OnParseSetTextureTag = function (textPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag, textureKey, frameKey) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.texture=key,frame]
            var tags = tag.split('.');
            if (IsSetTextureTag(tags, prefix)) {
                var name = tags[1];
                AppendCommandBase.call(textPlayer,
                    'sprite.texture',               // name
                    SetTexture,                     // callback
                    [name, textureKey, frameKey],   // params
                    textPlayer,                     // scope
                );
            } else {
                return;
            }

            parser.skipEvent();
        })
}

var SetTexture = function (params) {
    // this: textPlayer
    this.spriteManager.setTexture(...params);
}

export default OnParseSetTextureTag;