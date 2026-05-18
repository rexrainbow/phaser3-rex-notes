import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseFadeInSoundEffectTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se.fadein'
    parser
        .on(`+${tagName}`, function(time?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeInSoundEffect,   // callback
                time,                // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2.fadein'
    parser
        .on(`+${tagName}`, function(time?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeInSoundEffect2,  // callback
                time,                // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var FadeInSoundEffect = function(time?: any) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect(time);
}

var FadeInSoundEffect2 = function(time?: any) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect2(time);
}

export default OnParseFadeInSoundEffectTag;