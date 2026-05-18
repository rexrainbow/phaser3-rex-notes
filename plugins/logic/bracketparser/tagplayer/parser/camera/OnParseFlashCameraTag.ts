var OnParseFlashCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.flash';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            tagPlayer.cameraTarget.flash(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFlashCameraTag;