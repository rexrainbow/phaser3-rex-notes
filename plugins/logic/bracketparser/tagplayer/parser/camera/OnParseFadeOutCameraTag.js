const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            tagPlayer.camera.fadeOut(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeOutCameraTag;