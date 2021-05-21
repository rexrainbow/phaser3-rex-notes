import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseZoomCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.zoom', 'camera.zoom');
    parser
        .on(`+${tagName}`, function (value) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom',   // name
                ZoomCamera,      // callback
                value,           // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom.to',         // name
                ZoomToCamera,             // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var ZoomCamera = function (value) {
    this.camera.setZoom(value);  // this: textPlayer
}

var ZoomToCamera = function (params) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2];
    this.camera.zoomTo(value, duration, ease);  // this: textPlayer
}

export default OnParseZoomCameraTag;