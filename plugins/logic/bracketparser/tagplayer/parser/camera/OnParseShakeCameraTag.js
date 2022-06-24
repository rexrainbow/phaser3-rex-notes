const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseShakeCameraTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.shake', 'camera.shake');
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            tagPlayer.camera.shake(duration, intensity);

            parser.skipEvent();
        })
}

export default OnParseShakeCameraTag;