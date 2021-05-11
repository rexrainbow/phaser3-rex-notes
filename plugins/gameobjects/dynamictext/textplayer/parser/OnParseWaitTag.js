import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseWaitTag = function (dynamicText, parser) {
    parser
        .on('+wait', function (name) {
            AppendCommand(dynamicText, name);
            parser.skipEvent();
        })
        .on('-wait', function () {
            parser.skipEvent();
        })
        .on('+click', function () {  // Equal to +wait
            AppendCommand(dynamicText, 'click');
            parser.skipEvent();
        })
        .on('-click', function () {  // Equal to -wait
            parser.skipEvent();
        })
}

var Wait = function (name) {
    this.wait(name);
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