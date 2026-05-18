import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseCrossFadeBackgroundMusicTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.cross';
    parser
        .on(`+${tagName}`, function(name?: any, fadeTime?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                CrossFadeBackgroundMusic,  // callback
                [name, fadeTime],          // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'bgm2.cross';
    parser
        .on(`+${tagName}`, function(name?: any, fadeTime?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                CrossFadeBackgroundMusic2, // callback
                [name, fadeTime],          // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var CrossFadeBackgroundMusic = function(params?: any) {
    // this: textPlayer
    this.soundManager.crossFadeBackgroundMusic(...params);
}

var CrossFadeBackgroundMusic2 = function(params?: any) {
    // this: textPlayer
    this.soundManager.crossFadeBackgroundMusic2(...params);
}

export default OnParseCrossFadeBackgroundMusicTag;