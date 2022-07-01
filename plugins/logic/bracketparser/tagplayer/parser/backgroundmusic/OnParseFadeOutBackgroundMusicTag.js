const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.fadeout', 'bgm.fadeout');
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeOutBackgroundMusicTag;