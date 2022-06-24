const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseNewLineTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.r', 'r');
    var reTagOn = RegExp(parser.getTagOnRegString(tagName), 'gi');
    parser
        .on('preprocess', function (data) {
            data.source = data.source.replaceAll(reTagOn, '\n');
        })
}

export default OnParseNewLineTag;