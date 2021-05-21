import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

var OnParseRotateCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.rotate', 'camera.rotate');
    parser
        .on(`+${tagName}`, function (value) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                'camera.rotate',  // name
                RotateCamera,     // callback
                value,            // params
                textPlayer,       // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                'camera.rotate.to',       // name
                RotateToCamera,           // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var RotateCamera = function (value) {
    this.camera.setRotation(value);  // this: textPlayer
}

var RotateToCamera = function (params) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2];
    this.camera.rotateTo(value, false, duration, ease);  // this: textPlayer
}

export default OnParseRotateCameraTag;