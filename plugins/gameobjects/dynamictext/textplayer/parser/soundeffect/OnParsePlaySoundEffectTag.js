import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParsePlaySoundEffectTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se', 'se');
    parser
        .on(`+${tagName}`, function (name) {
            AppendCommand(textPlayer, name);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function (name) {
    this.soundManager.playSoundEffect(name);  // this: textPlayer
}

var AppendCommand = function (textPlayer, name) {
    AppendCommandBase.call(textPlayer,
        'se',             // name
        PlaySoundEffect,  // callback
        name,             // params
        textPlayer,       // scope
    );
}

export default OnParsePlaySoundEffectTag;