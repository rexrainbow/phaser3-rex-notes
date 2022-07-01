const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.fadein', 'bgm.fadein');
    parser
        .on(`+${tagName}`, function (time) {
            tagPlayer.soundManager.fadeInBackgroundMusic(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeInBackgroundMusicTag;