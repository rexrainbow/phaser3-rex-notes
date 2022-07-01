const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSetSoundEffectVolumeTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.volume', 'se.volume');
    parser
        .on(`+${tagName}`, function (volume) {
            tagPlayer.soundManager.setSoundEffectVolume(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetSoundEffectVolumeTag;