import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseSetSoundEffectMuteTag = function (textPlayer, parser, config) {
    var tagName = 'se.mute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetSoundEffectMute,        // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.mute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetSoundEffect2Mute,       // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })

    var tagName = 'se.unmute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetSoundEffectUnMute,      // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.unmute';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetSoundEffect2UnMute,     // callback
                undefined,                 // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetSoundEffectMute = function () {
    // this: textPlayer
    this.soundManager.setSoundEffectMute(true);
}

var SetSoundEffect2Mute = function () {
    // this: textPlayer
    this.soundManager.setSoundEffect2Mute(true);
}

var SetSoundEffectUnMute = function () {
    // this: textPlayer
    this.soundManager.setSoundEffectMute(false);
}

var SetSoundEffect2UnMute = function () {
    // this: textPlayer
    this.soundManager.setSoundEffect2Mute(false);
}

export default OnParseSetSoundEffectMuteTag;