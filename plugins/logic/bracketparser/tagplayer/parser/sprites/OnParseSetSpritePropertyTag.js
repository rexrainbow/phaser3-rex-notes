const GetValue = Phaser.Utils.Objects.GetValue;

var IsSetPropertyTag = function (tags, prefix) {
    // sprite.name.prop
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseSetSpritePropertyTag = function (tagPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.prop=value]
            var tags = tag.split('.');
            var name, property;
            if (IsSetPropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
            } else {
                return;
            }
            tagPlayer.spriteManager.setProperty(name, property, value);

            parser.skipEvent();
        })
}

var SetProperty = function (params) {
    // this: tagPlayer
    this.spriteManager.setProperty(...params);
}

export default OnParseSetSpritePropertyTag;