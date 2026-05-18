var OnParseZoomCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.zoom';
    parser
        .on(`+${tagName}`, function(value?: any) {
            tagPlayer.cameraTarget.setZoom(value);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function(value?: any, duration?: any, ease?: any) {
            tagPlayer.cameraTarget.zoomTo(value, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseZoomCameraTag;