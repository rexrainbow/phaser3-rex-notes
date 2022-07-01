const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePlayBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm', 'bgm');
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            tagPlayer.soundManager.playBackgroundMusic(name);
            if (fadeInTime) {
                tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            tagPlayer.soundManager.stopBackgroundMusic();

            parser.skipEvent();
        })
}

export default OnParsePlayBackgroundMusicTag;