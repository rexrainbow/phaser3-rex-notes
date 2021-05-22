import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                'camera.fadeout',              // name
                PlayFadeOutEffect,             // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeOutEffect = function (params) {
    // this: textPlayer
    this.camera.fadeOut(...params);
}

export default OnParseFadeOutCameraTag;