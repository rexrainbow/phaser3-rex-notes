var OnParseScrollCameraTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.scroll';
    parser
        .on(`+${tagName}`, function(x?: any, y?: any) {
            tagPlayer.cameraTarget.setScroll(x, y);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function(x?: any, y?: any, duration?: any, ease?: any) {
            // this: tagPlayer
            var camera = tagPlayer.cameraTarget;
            var xSave = camera.scrollX;
            var ySave = camera.scrollY;
            camera.setScroll(x, y);
            x += camera.centerX;
            y += camera.centerY;
            camera.setScroll(xSave, ySave);

            // x,y in pan() is the centerX, centerY
            camera.pan(x, y, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseScrollCameraTag;