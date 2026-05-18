var OnParseSetBackgroundMusicVolumeTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            tagPlayer.soundManager.setBackgroundMusicVolume(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'bgm2.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            tagPlayer.soundManager.setBackgroundMusicVolume2(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseSetBackgroundMusicVolumeTag;