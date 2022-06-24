const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            textPlayer.camera.fadeOut(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeOutCameraTag;