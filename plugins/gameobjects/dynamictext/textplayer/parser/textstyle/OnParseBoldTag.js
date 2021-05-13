const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseBoldTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.b', 'b');
    parser
        .on('start', function () {
            textPlayer.textStyle.setBold(false);
        })
        .on(`+${tagName}`, function () {
            textPlayer.textStyle.setBold(true);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            textPlayer.textStyle.setBold(false);
            parser.skipEvent();
        })
}

export default OnParseBoldTag;