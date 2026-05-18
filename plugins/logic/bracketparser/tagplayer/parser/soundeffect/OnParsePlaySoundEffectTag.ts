var OnParsePlaySoundEffectTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            if (this.skipSoundEffect) {
                return;
            }

            tagPlayer.soundManager.playSoundEffect(name);  // this: tagPlayer
            if (fadeInTime?: any) {
                tagPlayer.soundManager.fadeInSoundEffect(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            if (this.skipSoundEffect) {
                return;
            }

            tagPlayer.soundManager.playSoundEffect2(name);  // this: tagPlayer
            if (fadeInTime?: any) {
                tagPlayer.soundManager.fadeInSoundEffect2(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

export default OnParsePlaySoundEffectTag;