var OnParseSetBackgroundMusicMuteTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm.mute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setBackgroundMusicMute(true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.mute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setBackgroundMusic2Mute(true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })

    var tagName = 'bgm.unmute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setBackgroundMusicMute(false);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.unmute';
    parser
        .on(`+${tagName}`, function () {
            tagPlayer.soundManager.setBackgroundMusic2Mute(false);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetBackgroundMusicMuteTag;