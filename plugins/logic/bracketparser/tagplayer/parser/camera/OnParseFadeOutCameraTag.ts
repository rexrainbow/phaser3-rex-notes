var OnParseFadeOutCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.fadeout';
    parser
        .on(`+${tagName}`, function(duration?: any, red?: any, green?: any, blue?: any) {
            tagPlayer.cameraTarget.fadeOut(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeOutCameraTag;