import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseCustomTag = function(textPlayer?: any, parser?: any, config?: any) {
    parser
        .on('start', function() {
            textPlayer.emit('parser.start', parser);
        })
        .on('+', function(tagName?: any, ...value) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            var startTag = `+${tagName}`;
            var param = value;
            textPlayer.emit(`parser.${startTag}`, parser, ...value, param);
            AppendCommand(textPlayer, startTag, param);
        })
        .on('-', function(tagName?: any) {
            if (parser.skipEventFlag) {
                return;
            }

            var endTag = `-${tagName}`;
            var param = [];
            textPlayer.emit(`parser.${endTag}`, parser, param);
            AppendCommand(textPlayer, endTag, param);
        })
        .on('complete', function() {
            textPlayer.emit('parser.complete', parser);
        })
}

var FireEvent = function(param?: any, tagName?: any) {
    var eventName = `tag.${tagName}`;
    // this: textPlayer
    if (param == null) {
        this.emit(eventName);
    } else {
        this.emit(eventName, ...param);
    }

}

var AppendCommand = function(textPlayer?: any, name?: any, param?: any) {
    AppendCommandBase.call(textPlayer,
        name,         // name
        FireEvent,    // callback
        param,        // params
        textPlayer,   // scope
    );
}

export default OnParseCustomTag;