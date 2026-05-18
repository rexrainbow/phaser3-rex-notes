import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParsePlaySoundEffectTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'se';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlaySoundEffect,      // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'se2';
    parser
        .on(`+${tagName}`, function(name?: any, fadeInTime?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlaySoundEffect2,      // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function(params?: any) {
    if (this.skipSoundEffect) {
        return;
    }

    var name = params[0];
    var fadeInTime = params[1];

    this.soundManager.playSoundEffect(name);  // this: textPlayer
    if (fadeInTime?: any) {
        this.soundManager.fadeInSoundEffect(fadeInTime);
    }
}

var PlaySoundEffect2 = function(params?: any) {
    if (this.skipSoundEffect) {
        return;
    }

    var name = params[0];
    var fadeInTime = params[1];

    this.soundManager.playSoundEffect2(name);  // this: textPlayer
    if (fadeInTime?: any) {
        this.soundManager.fadeInSoundEffect2(fadeInTime);
    }
}

export default OnParsePlaySoundEffectTag;