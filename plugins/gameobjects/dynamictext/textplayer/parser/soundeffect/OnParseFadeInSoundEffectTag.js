import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeInSoundEffectTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.fadein', 'se.fadein');
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommand(textPlayer, time);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInSoundEffect = function (time) {
    this.soundManager.fadeInSoundEffect(time);  // this: textPlayer
}

var AppendCommand = function (textPlayer, time) {
    AppendCommandBase.call(textPlayer,
        'se.fadein',         // name
        FadeInSoundEffect,   // callback
        time,                // params
        textPlayer,          // scope
    );
}

export default OnParseFadeInSoundEffectTag;