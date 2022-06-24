const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseRemoveAllSpritesTag = function (tagPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite]
            if (tag === prefix) {
            } else {
                return;
            }

            tagPlayer.spriteManager.removeAll();
            parser.skipEvent();
        })
}

export default OnParseRemoveAllSpritesTag;