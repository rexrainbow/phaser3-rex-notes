var OnParseSetSoundEffectMuteTag = function (tagPlayer, parser, config) {
    var tagName = 'se.mute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setSoundEffectMute(true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.mute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setSoundEffect2Mute(true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })

    var tagName = 'se.unmute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setSoundEffectMute(false);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.unmute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setSoundEffect2Mute(false);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetSoundEffectMuteTag;