import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSetSoundEffectVolumeTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.volume', 'se.volume');
    parser
        .on(`+${tagName}`, function (name) {
            AppendCommandBase.call(textPlayer,
                'se.volume',           // name
                SetSoundEffectVolume,  // callback
                name,                  // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetSoundEffectVolume = function (name) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(name);
}

export default OnParseSetSoundEffectVolumeTag;