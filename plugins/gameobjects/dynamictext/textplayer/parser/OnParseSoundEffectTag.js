import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSoundEffectTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.se', 'se');
    parser
        .on(`+${tagName}`, function (name) {
            AppendCommand(dynamicText, name);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function(name) {
    this.play(name); // scene.sound.play(name)
}

var AppendCommand = function (dynamicText, name) {
    AppendCommandBase.call(dynamicText,
        'se',                     // name
        PlaySoundEffect,          // callback
        name,                     // params
        dynamicText.scene.sound,  // scope
    );
}

export default OnParseSoundEffectTag;