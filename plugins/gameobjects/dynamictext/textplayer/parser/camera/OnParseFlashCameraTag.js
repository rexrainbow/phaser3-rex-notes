import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFlashCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.flash', 'camera.flash');
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