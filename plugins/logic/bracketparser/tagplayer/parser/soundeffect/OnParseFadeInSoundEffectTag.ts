var OnParseFadeInSoundEffectTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se.fadein';
    parser
        .on(`+${tagName}`, function(time?: any) {
            tagPlayer.soundManager.fadeInSoundEffect(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2.fadein';
    parser
        .on(`+${tagName}`, function(time?: any) {
            tagPlayer.soundManager.fadeInSoundEffect2(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParseFadeInSoundEffectTag;