const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFlashCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.flash', 'camera.flash');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            textPlayer.camera.flash(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFlashCameraTag;