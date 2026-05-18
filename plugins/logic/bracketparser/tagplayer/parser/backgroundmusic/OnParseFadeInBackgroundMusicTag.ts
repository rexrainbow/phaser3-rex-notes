var OnParseFadeInBackgroundMusicTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.fadein';
    parser
        .on(`+${tagName}`, function(time?: any) {
            tagPlayer.soundManager.fadeInBackgroundMusic(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'bgm2.fadein';
    parser
        .on(`+${tagName}`, function(time?: any) {
            tagPlayer.soundManager.fadeInBackgroundMusic2(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseFadeInBackgroundMusicTag;