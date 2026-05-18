var OnParsePauseBackgroundMusicTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.pause';
    parser
        .on(`+${tagName}`, function() {
            tagPlayer.soundManager.pauseBackgroundMusic();

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            tagPlayer.soundManager.resumeBackgroundMusic();

            parser.skipEvent();
        })


    var tagName = 'bgm2.pause';
    parser
        .on(`+${tagName}`, function() {
            tagPlayer.soundManager.pauseBackgroundMusic2();

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            tagPlayer.soundManager.resumeBackgroundMusic2();

            parser.skipEvent();
        })
}

export default OnParsePauseBackgroundMusicTag;