import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseSetSoundEffectVolumeTag = function (textPlayer, parser, config) {
    var tagName = 'se.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            AppendCommandBase.call(textPlayer,
                'se.volume',           // name
                SetSoundEffectVolume,  // callback
                volume,                // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetSoundEffectVolume = function (volume) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(volume, true);
}

export default OnParseSetSoundEffectVolumeTag;