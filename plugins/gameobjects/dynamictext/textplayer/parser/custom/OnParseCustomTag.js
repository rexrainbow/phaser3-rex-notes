import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseCustomTag = function (textPlayer, parser, config) {
    parser
        .on('start', function () {
            textPlayer.emit('parser.start', parser);
        })
        .on('+', function (tagName, value) {
            textPlayer.emit(`parser.+${tagName}`, value, parser);
            AppendCommand(textPlayer, tagName, value);
        })
        .on('-', function (tagName) {
            textPlayer.emit(`parser.-${tagName}`, parser);
            AppendCommand(textPlayer, tagName);
        })
        .on('complete', function () {
            textPlayer.emit('parser.complete', parser);
        })
}

var FireEvent = function (param, tagName) {
    this.emit(`tag.${tagName}`, param);  // this: textPlayer
}

var AppendCommand = function (textPlayer, name, param) {
    AppendCommandBase.call(textPlayer,
        name,         // name
        FireEvent,    // callback
        param,        // params
        textPlayer,   // scope
    );
}

export default OnParseCustomTag;