import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseFadeOutSoundEffectTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se.fadeout';
    parser
        .on(`+${tagName}`, function(time?: any, isStopped?: any) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeOutSoundEffect,  // callback
                [time, isStopped],   // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2.fadeout';
    parser
        .on(`+${tagName}`, function(time?: any, isStopped?: any) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeOutSoundEffect2,  // callback
                [time, isStopped],   // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var FadeOutSoundEffect = function(params?: any) {
    // this: textPlayer
    this.soundManager.fadeOutSoundEffect(...params);
}

var FadeOutSoundEffect2 = function(params?: any) {
    // this: textPlayer
    this.soundManager.fadeOutSoundEffect2(...params);
}
export default OnParseFadeOutSoundEffectTag;