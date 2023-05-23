var OnParseZoomCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser
        .on(`+${tagName}`, function (value) {
            tagPlayer.cameraTarget.setZoom(value);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            tagPlayer.cameraTarget.zoomTo(value, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseZoomCameraTag;