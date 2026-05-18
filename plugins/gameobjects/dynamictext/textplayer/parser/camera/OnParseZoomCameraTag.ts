import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseZoomCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.zoom';
    parser
        .on(`+${tagName}`, function(value?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,         // name
                Zoom,            // callback
                value,           // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function(value?: any, duration?: any, ease?: any) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom.to',         // name
                ZoomTo,                   // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var Zoom = function(value?: any) {
    // this: textPlayer
    this.cameraTarget.setZoom(value);
}

var ZoomTo = function(params?: any) {
    // this: textPlayer
    this.cameraTarget.zoomTo(...params);
}

export default OnParseZoomCameraTag;