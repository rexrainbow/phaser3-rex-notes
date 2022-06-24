const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePauseBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.pause', 'bgm.pause');
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