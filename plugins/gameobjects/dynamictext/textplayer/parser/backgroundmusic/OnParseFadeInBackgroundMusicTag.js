import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.fadein', 'bgm.fadein');
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommand(textPlayer, time);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInBackgroundMusic = function (time) {
    this.soundManager.fadeInBackgroundMusic(time);  // this: textPlayer
}

var AppendCommand = function (textPlayer, time) {
    AppendCommandBase.call(textPlayer,
        'bgm.fadein',            // name
        FadeInBackgroundMusic,   // callback
        time,                    // params
        textPlayer,              // scope
    );
}

export default OnParseFadeInBackgroundMusicTag;