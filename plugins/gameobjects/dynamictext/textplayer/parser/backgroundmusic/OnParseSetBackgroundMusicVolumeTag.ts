import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseSetBackgroundMusicVolumeTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'bgm.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusicVolume,  // callback
                volume,                    // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })


    var tagName = 'bgm2.volume';
    parser
        .on(`+${tagName}`, function(volume?: any) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                SetBackgroundMusicVolume2, // callback
                volume,                    // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            parser.skipEvent();
        })
}

var SetBackgroundMusicVolume = function(volume?: any) {
    // this: textPlayer
    this.soundManager.setBackgroundMusicVolume(volume);
}

var SetBackgroundMusicVolume2 = function(volume?: any) {
    // this: textPlayer
    this.soundManager.setBackgroundMusicVolume2(volume);
}
export default OnParseSetBackgroundMusicVolumeTag;