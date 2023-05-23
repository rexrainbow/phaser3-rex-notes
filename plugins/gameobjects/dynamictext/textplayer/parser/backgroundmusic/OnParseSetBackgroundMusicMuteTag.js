import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseSetBackgroundMusicMuteTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.mute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusicMute,    // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.mute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusic2Mute,   // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })

    var tagName = 'bgm.unmute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusicUnMute,  // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.unmute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusic2UnMute, // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetBackgroundMusicMute = function () {
    // this: textPlayer
    this.soundManager.setBackgroundMusicMute(true);
}

var SetBackgroundMusic2Mute = function () {
    // this: textPlayer
    this.soundManager.setBackgroundMusic2Mute(true);
}

var SetBackgroundMusicUnMute = function () {
    // this: textPlayer
    this.soundManager.setBackgroundMusicMute(false);
}

var SetBackgroundMusic2UnMute = function () {
    // this: textPlayer
    this.soundManager.setBackgroundMusic2Mute(false);
}

export default OnParseSetBackgroundMusicMuteTag;