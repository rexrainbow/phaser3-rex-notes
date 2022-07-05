import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeInBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                'bgm.fadein',            // name
                FadeInBackgroundMusic,   // callback
                time,                    // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInBackgroundMusic = function (time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic(time);
}

export default OnParseFadeInBackgroundMusicTag;