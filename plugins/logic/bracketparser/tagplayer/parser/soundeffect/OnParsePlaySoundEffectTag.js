const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePlaySoundEffectTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se', 'se');
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            if (this.skipSoundEffect) {
                return;
            }

            tagPlayer.soundManager.playSoundEffect(name);  // this: tagPlayer
            if (fadeInTime) {
                tagPlayer.soundManager.fadeInSoundEffect(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParsePlaySoundEffectTag;