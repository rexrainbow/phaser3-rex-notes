import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePauseBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.pause', 'bgm.pause');
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm.pause',           // name
                PauseBackgroundMusic,  // callback
                undefined,             // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm.resume',           // name
                ResumeBackgroundMusic,  // callback
                undefined,              // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PauseBackgroundMusic = function () {
    this.soundManager.pauseBackgroundMusic();  // this: textPlayer
}

var ResumeBackgroundMusic = function () {
    this.soundManager.resumeBackgroundMusic();  // this: textPlayer
}

export default OnParsePauseBackgroundMusicTag;