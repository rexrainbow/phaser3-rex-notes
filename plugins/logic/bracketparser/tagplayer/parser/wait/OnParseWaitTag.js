const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseWaitTag = function (tagPlayer, parser, config) {
    var tagWait = GetValue(config, 'tags.wait', 'wait');
    var tagClick = GetValue(config, 'tags.click', 'click');
    parser
        .on(`+${tagWait}`, function (name) {
            tagPlayer.wait(name);
            parser.skipEvent();
        })
        .on(`-${tagWait}`, function () {
            parser.skipEvent();
        })
        .on(`+${tagClick}`, function () {  // Equal to [wait=click]
            tagPlayer.wait('click');
            parser.skipEvent();
        })
        .on(`-${tagClick}`, function () {  // Equal to [/wait]
            parser.skipEvent();
        })
}

export default OnParseWaitTag;