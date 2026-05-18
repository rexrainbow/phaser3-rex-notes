var OnParseFadeOutBackgroundMusicTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.fadeout';
    parser
        .on(`+${tagName}`, function(time?: any, isStopped?: any) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'bgm2.fadeout';
    parser
        .on(`+${tagName}`, function(time?: any, isStopped?: any) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutBackgroundMusic2(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseFadeOutBackgroundMusicTag;