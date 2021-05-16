import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseCustomTag = function (textPlayer, parser, config) {
    parser
        .on('start', function () {
            textPlayer.emit('parser.start', parser);
        })
        .on('+', function (tagName, ...value) {
            var startTag = `+${tagName}`;
            textPlayer.emit(`parser.${startTag}`, parser, ...value);
            AppendCommand(textPlayer, startTag, value);
        })
        .on('-', function (tagName) {
            var endTag = `-${tagName}`;
            textPlayer.emit(`parser.${endTag}`, parser);
            AppendCommand(textPlayer, endTag);
        })
        .on('complete', function () {
            textPlayer.emit('parser.complete', parser);
        })
}

var FireEvent = function (param, tagName) {
    var eventName = `tag.${tagName}`;
    if (param == null) {
        this.emit(eventName);  // this: textPlayer
    } else {
        this.emit(eventName, ...param);  // this: textPlayer
    }

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