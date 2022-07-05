var OnParseShakeCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            tagPlayer.camera.shake(duration, intensity);

            parser.skipEvent();
        })
}

export default OnParseShakeCameraTag;