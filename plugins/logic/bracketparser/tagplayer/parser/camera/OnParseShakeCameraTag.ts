var OnParseShakeCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.shake';
    parser
        .on(`+${tagName}`, function(duration?: any, intensity?: any) {
            tagPlayer.cameraTarget.shake(duration, intensity);

            parser.skipEvent();
        })
}

export default OnParseShakeCameraTag;