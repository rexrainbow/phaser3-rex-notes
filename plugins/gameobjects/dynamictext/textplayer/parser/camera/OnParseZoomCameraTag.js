import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseZoomCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.zoom', 'camera.zoom');
    parser
        .on(`+${tagName}`, function (value) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom',   // name
                Zoom,      // callback
                value,           // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom.to',         // name
                ZoomTo,             // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var Zoom = function (value) {
    // this: textPlayer
    this.camera.setZoom(value);
}

var ZoomTo = function (params) {
    // this: textPlayer
    this.camera.zoomTo(...params);
}

export default OnParseZoomCameraTag;