import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFlashCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.flash';
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.flash',                // name
                PlayFlashEffect,               // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFlashEffect = function (params) {
    // this: textPlayer
    this.camera.flash(...params);
}

export default OnParseFlashCameraTag;