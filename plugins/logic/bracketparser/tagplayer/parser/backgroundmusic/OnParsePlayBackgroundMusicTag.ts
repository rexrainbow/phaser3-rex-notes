var OnParsePlayBackgroundMusicTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            tagPlayer.soundManager.playBackgroundMusic(name);
            if (fadeInTime?: any) {
                tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            tagPlayer.soundManager.stopBackgroundMusic();

            parser.skipEvent();
        })


    var tagName = 'bgm2';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            tagPlayer.soundManager.playBackgroundMusic2(name);
            if (fadeInTime?: any) {
                tagPlayer.soundManager.fadeInBackgroundMusic2(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            tagPlayer.soundManager.stopBackgroundMusic2();

            parser.skipEvent();
        })
}

export default OnParsePlayBackgroundMusicTag;