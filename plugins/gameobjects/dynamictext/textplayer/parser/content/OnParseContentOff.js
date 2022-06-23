const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseContentOff = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.content.off', 'content.off');
    parser
        .on(`+${tagName}`, function () {
            parser.setContentOutputEnable(false);
            parser.skipEvent();
        })
}

export default OnParseContentOff;