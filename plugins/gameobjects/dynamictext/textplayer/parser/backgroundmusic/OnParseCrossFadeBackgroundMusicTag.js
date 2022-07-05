import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseCrossFadeBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            AppendCommandBase.call(textPlayer,
                'bgm.cross',               // name
                CrossFadeBackgroundMusic,  // callback
                [name, fadeTime],          // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var CrossFadeBackgroundMusic = function (params) {
    // this: textPlayer
    this.soundManager.crossFadeBackgroundMusic(...params);
}

export default OnParseCrossFadeBackgroundMusicTag;