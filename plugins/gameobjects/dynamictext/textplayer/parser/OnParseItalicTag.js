const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseItalicTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.i', 'i');
    parser
        .on('start', function () {
            dynamicText.textStyle.setItalic(false);
        })
        .on(`+${tagName}`, function () {
            dynamicText.textStyle.setItalic(true);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setItalic(false);
            parser.skipEvent();
        })
}

export default OnParseItalicTag;