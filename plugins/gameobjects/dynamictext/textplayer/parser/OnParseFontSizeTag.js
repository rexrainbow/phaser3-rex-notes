const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFontSizeTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.size', 'size');
    var defaultFontSize;
    parser
        .on('start', function () {
            defaultFontSize = dynamicText.textStyle.fontSize;
        })
        .on(`+${tagName}`, function (fontSize) {
            dynamicText.textStyle.setFontSize(fontSize);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            dynamicText.textStyle.setFontSize(defaultFontSize);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.textStyle.setFontSize(defaultFontSize);
        })
}

export default OnParseFontSizeTag;