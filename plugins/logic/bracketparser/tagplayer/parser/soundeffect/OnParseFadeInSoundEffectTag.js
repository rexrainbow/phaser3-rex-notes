const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInSoundEffectTag = function (tagPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.fadein', 'se.fadein');
    parser
        .on(`+${tagName}`, function (time) {
            tagPlayer.soundManager.fadeInSoundEffect(time);
            
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeInSoundEffectTag;