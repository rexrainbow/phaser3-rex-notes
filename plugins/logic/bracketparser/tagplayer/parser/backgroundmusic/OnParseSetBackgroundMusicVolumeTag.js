const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSetBackgroundMusicVolumeTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.volume', 'bgm.volume');
    parser
        .on(`+${tagName}`, function (volume) {
            tagPlayer.soundManager.setBackgroundMusicVolume(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetBackgroundMusicVolumeTag;