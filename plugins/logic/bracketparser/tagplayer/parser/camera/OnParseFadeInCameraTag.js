const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadein', 'camera.fadein');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            tagPlayer.camera.fadeIn(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeInCameraTag;