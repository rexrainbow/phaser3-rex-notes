import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseShakeCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.shake', 'camera.shake');
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            AppendCommandBase.call(textPlayer,
                'camera.shake',         // name
                PlayShakeEffect,        // callback
                [duration, intensity],  // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PlayShakeEffect = function (params) {
    // this: textPlayer
    this.camera.shake(...params);
}

export default OnParseShakeCameraTag;