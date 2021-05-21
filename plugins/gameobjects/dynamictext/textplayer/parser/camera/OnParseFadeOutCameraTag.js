import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.fadeout',              // name
                PlayFadeOutCameraEffect,       // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeOutCameraEffect = function (params) {
    var duration = params[0];
    var red = params[1];
    var green = params[2];
    var blue = params[2];

    this.camera.fadeOut(duration, red, green, blue);  // this: textPlayer
}

export default OnParseFadeOutCameraTag;