const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFlashCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.flash', 'camera.flash');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            tagPlayer.camera.flash(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFlashCameraTag;