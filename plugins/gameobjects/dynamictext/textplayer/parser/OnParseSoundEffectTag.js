import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSoundEffectTag = function (textPlayer, parser, config) {
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

var PlaySoundEffect = function(name) {
    this.play(name); // scene.sound.play(name)
}

var AppendCommand = function (textPlayer, name) {
    AppendCommandBase.call(textPlayer,
        'se',                     // name
        PlaySoundEffect,          // callback
        name,                     // params
        textPlayer.scene.sound,  // scope
    );
}

export default OnParseSoundEffectTag;