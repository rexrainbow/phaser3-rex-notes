const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutSoundEffectTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.fadeout', 'se.fadeout');
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeOutSoundEffectTag;