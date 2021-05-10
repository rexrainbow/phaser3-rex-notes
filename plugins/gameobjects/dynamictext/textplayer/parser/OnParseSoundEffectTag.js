import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseSoundEffectTag = function (dynamicText, parser) {
    parser
        .on('+se', function (name) {
            AppendCommand(dynamicText, name);
            parser.skipEvent();
        })
        .on('-se', function () {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function(name) {
    this.play(name); // Don't pass more parameters
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