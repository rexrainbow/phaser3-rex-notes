import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseZoomCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.zoom', 'camera.zoom');
    parser
        .on(`+${tagName}`, function (value) {
            textPlayer.camera.setZoom(value);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            textPlayer.camera.zoomTo(value, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseZoomCameraTag;