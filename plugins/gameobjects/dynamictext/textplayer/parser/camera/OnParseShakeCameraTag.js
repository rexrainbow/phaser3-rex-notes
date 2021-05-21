import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseShakeCameraTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.camera.shake', 'camera.shake');
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            AppendCommandBase.call(textPlayer,
                'camera.shake',         // name
                PlayShakeCameraEffect,  // callback
                [duration, intensity],  // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PlayShakeCameraEffect = function (params) {
    var duration = params[0];
    var intensity = params[1];

    this.camera.shake(duration, intensity) // this: textPlayer
}

export default OnParseShakeCameraTag;