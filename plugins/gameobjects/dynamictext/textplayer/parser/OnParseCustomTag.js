import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseCustomTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.emit('parser.start', parser);
        })
        .on('+', function (tagName, value) {
            dynamicText.emit(`parser.+${tagName}`, value, parser);
            AppendCommand(dynamicText, tagName, value);
        })
        .on('-', function (tagName) {
            dynamicText.emit(`parser.-${tagName}`, parser);
            AppendCommand(dynamicText, tagName);
        })
        .on('complete', function () {
            dynamicText.emit('parser.complete', parser);
        })
}

var FireEvent = function (param, tagName) {
    this.emit(`tag.${tagName}`, param);  // dynamicText.emit(...)
}

var AppendCommand = function (dynamicText, name, param) {
    AppendCommandBase.call(dynamicText,
        name,         // name
        FireEvent,    // callback
        param,        // params
        dynamicText,  // scope
    );
}

export default OnParseCustomTag;