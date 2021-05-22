import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePlayBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm', 'bgm');
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                'bgm',                // name
                PlayBackgroundMusic,  // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm.stop',           // name
                StopBackgroundMusic,  // callback
                undefined,            // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
}

var PlayBackgroundMusic = function (params) {
    var name = params[0];
    var fadeInTime = params[1];

    // this: textPlayer
    this.soundManager.playBackgroundMusic(name);
    if (fadeInTime) {
        this.soundManager.fadeInBackgroundMusic(fadeInTime);
    }
}

var StopBackgroundMusic = function () {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic();
}

export default OnParsePlayBackgroundMusicTag;