import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseSetBackgroundMusicVolumeTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.bgm.volume', 'bgm.volume');
    parser
        .on(`+${tagName}`, function (name) {
            AppendCommandBase.call(textPlayer,
                'bgm.volume',              // name
                SetBackgroundMusicVolume,  // callback
                name,                      // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetBackgroundMusicVolume = function (name) {
    // this: textPlayer
    this.soundManager.setBackgroundMusicVolume(name);
}

export default OnParseSetBackgroundMusicVolumeTag;