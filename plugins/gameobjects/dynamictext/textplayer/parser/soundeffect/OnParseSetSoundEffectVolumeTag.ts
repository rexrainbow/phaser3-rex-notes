import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseSetSoundEffectVolumeTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                SetSoundEffectVolume,  // callback
                volume,                // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                SetSoundEffectVolume2,  // callback
                volume,                // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var SetSoundEffectVolume = function(volume?: any) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(volume, true);
}

var SetSoundEffectVolume2 = function(volume?: any) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume2(volume, true);
}
export default OnParseSetSoundEffectVolumeTag;