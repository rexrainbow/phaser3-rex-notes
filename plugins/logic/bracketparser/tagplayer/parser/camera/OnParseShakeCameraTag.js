const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseShakeCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.shake', 'camera.shake');
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            textPlayer.camera.shake(duration, intensity);

            parser.skipEvent();
        })
}

export default OnParseShakeCameraTag;