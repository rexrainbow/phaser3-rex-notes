import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseFadeOutSoundEffectTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.se.fadeout', 'se.fadeout');
    parser
        .on(`+${tagName}`, function (time) {
            if (typeof (time) === 'number') { // Fade out only
                AppendCommand(textPlayer, time, false);
            } else {
                var params = time.split(',');
                time = parseFloat(params[0]);
                var isStopped = (params[1] === 'stop');
                AppendCommand(textPlayer, time, isStopped);
            }
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeOutSoundEffect = function (params) {
    this.soundManager.fadeOutSoundEffect.apply(this.soundManager, params);  // this: textPlayer
}

var AppendCommand = function (textPlayer, time, isStopped) {
    AppendCommandBase.call(textPlayer,
        'se.fadeout',        // name
        FadeOutSoundEffect,  // callback
        [time, isStopped],   // params
        textPlayer,          // scope
    );
}

export default OnParseFadeOutSoundEffectTag;