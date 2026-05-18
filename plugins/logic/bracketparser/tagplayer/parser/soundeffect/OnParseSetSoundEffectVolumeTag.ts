var OnParseSetSoundEffectVolumeTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            tagPlayer.soundManager.setSoundEffectVolume(volume, true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            tagPlayer.soundManager.setSoundEffectVolume2(volume, true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseSetSoundEffectVolumeTag;