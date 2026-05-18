var OnParseFadeInCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.fadein';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            tagPlayer.cameraTarget.fadeIn(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeInCameraTag;