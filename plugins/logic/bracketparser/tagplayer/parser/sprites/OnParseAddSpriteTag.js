var IsAddSpriteTag = function (tags, prefix) {
    // sprite.name
    return (tags.length === 2) && (tags[0] === prefix)
}

var OnParseAddSpriteTag = function (tagPlayer, parser, config) {
    var prefix = 'sprite';
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
            var name;
            if (IsAddSpriteTag(tags, prefix)) {
                name = tags[1];                
            } else {
                return;
            }
            tagPlayer.spriteManager.add(name, ...args);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite.name]
            var tags = tag.split('.');
            var name;
            if (IsAddSpriteTag(tags, prefix)) {
                name = tags[1];                
            } else {
                return;
            }
            tagPlayer.spriteManager.remove(name);

            parser.skipEvent();
        })
}

export default OnParseAddSpriteTag;