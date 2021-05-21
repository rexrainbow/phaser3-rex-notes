import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFlashCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.flash', 'camera.flash');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.flash',                // name
                PlayFlashCameraEffect,         // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFlashCameraEffect = function (params) {
    var duration = params[0];
    var red = params[1];
    var green = params[2];
    var blue = params[2];

    this.camera.flash(duration, red, green, blue) // this: textPlayer
}

export default OnParseFlashCameraTag;