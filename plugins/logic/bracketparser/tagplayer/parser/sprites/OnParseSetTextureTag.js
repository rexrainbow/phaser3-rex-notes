var IsSetTextureTag = function (tags, prefix) {
    // sprite.name.texture
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'texture')
}

var OnParseSetTextureTag = function (tagPlayer, parser, config) {
    var prefix = 'sprite';
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
            var name
            if (IsSetTextureTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.spriteManager.setTexture(name, textureKey, frameKey);

            parser.skipEvent();
        })
}

var SetTexture = function (params) {
    // this: tagPlayer
    this.spriteManager.setTexture(...params);
}

export default OnParseSetTextureTag;