const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseCrossFadeBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.cross', 'bgm.cross');
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseCrossFadeBackgroundMusicTag;