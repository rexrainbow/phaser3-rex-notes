import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

import { Math as PhaserMath } from 'phaser';
const DegToRad = PhaserMath.DegToRad;

var OnParseRotateCameraTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'camera.rotate';
    parser
        .on(`+${tagName}`, function(value?: any) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                tagName,          // name
                Rotate,           // callback
                value,            // params
                textPlayer,       // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function(value?: any, duration?: any, ease?: any) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                'camera.rotate.to',       // name
                RotateTo,                 // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var Rotate = function(value?: any) {
    // this: textPlayer
    this.cameraTarget.setRotation(value);
}

var RotateTo = function(params?: any) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2];

    // this: textPlayer
    this.cameraTarget.rotateTo(value, false, duration, ease);
}

export default OnParseRotateCameraTag;