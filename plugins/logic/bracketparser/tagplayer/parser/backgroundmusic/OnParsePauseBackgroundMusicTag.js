var OnParsePauseBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm.pause';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.pauseBackgroundMusic();

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            tagPlayer.soundManager.resumeBackgroundMusic();

            parser.skipEvent();
        })
}

export default OnParsePauseBackgroundMusicTag;