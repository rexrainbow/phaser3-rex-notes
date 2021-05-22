import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadein', 'camera.fadein');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.fadein',               // name
                PlayFadeInEffect,              // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeInEffect = function (params) {
    // this: textPlayer
    this.camera.fadeIn(...params);
}

export default OnParseFadeInCameraTag;