import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePlaySoundEffectTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se', 'se');
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                'se',                 // name
                PlaySoundEffect,      // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function (params) {
    if (this.skipSoundEffect) {
        return;
    }

    var name = params[0];
    var fadeInTime = params[1];

    this.soundManager.playSoundEffect(name);  // this: textPlayer
    if (fadeInTime) {
        this.soundManager.fadeInSoundEffect(fadeInTime);
    }
}

export default OnParsePlaySoundEffectTag;