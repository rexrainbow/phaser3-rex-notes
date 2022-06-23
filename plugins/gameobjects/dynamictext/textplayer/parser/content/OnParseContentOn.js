const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseContentOn = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.content.on', 'content.on');
    parser
        .on(`+${tagName}`, function () {
            parser.setContentOutputEnable();
            parser.skipEvent();
        })
}

export default OnParseContentOn;