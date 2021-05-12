const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseBoldTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.b', 'b');
    parser
        .on('start', function () {
            dynamicText.textStyle.setBold(false);
        })
        .on(`+${tagName}`, function () {
            dynamicText.textStyle.setBold(true);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setBold(false);
            parser.skipEvent();
        })
}

export default OnParseBoldTag;