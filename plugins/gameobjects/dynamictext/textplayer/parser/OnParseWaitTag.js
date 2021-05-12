import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseWaitTag = function (dynamicText, parser, config) {
    var tagWait = GetValue(config, 'tags.wait', 'wait');
    var tagClick = GetValue(config, 'tags.click', 'click');
    parser
        .on(`+${tagWait}`, function (name) {
            AppendCommand(dynamicText, name);
            parser.skipEvent();
        })
        .on(`-${tagWait}`, function () {
            parser.skipEvent();
        })
        .on(`+${tagClick}`, function () {  // Equal to [wait=click]
            AppendCommand(dynamicText, 'click');
            parser.skipEvent();
        })
        .on(`-${tagClick}`, function () {  // Equal to [/wait]
            parser.skipEvent();
        })
}

var Wait = function (name) {
    this.wait(name);  // typeWriter.wait(name)
}

var AppendCommand = function (dynamicText, name) {
    AppendCommandBase.call(dynamicText,
        'wait',                  // name
        Wait,                    // callback
        name,                    // params
        dynamicText.typeWriter,  // scope
    );
}

export default OnParseWaitTag;