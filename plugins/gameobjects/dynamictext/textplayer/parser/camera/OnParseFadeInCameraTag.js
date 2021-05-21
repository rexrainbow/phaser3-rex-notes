import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadein', 'camera.fadein');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.fadein',               // name
                PlayFadeInCameraEffect,        // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeInCameraEffect = function (params) {
    var duration = params[0];
    var red = params[1];
    var green = params[2];
    var blue = params[2];

    this.camera.fadeIn(duration, red, green, blue);  // this: textPlayer
}

export default OnParseFadeInCameraTag;