import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseWaitTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagWait = 'wait';
    var tagClick = 'click';
    parser
        .on(`+${tagWait}`, function(name?: any) {
            AppendCommand(textPlayer, name);
            parser.skipEvent();
        })
        .on(`-${tagWait}`, function() {
            parser.skipEvent();
        })
        .on(`+${tagClick}`, function() {  // Equal to [wait=click]
            AppendCommand(textPlayer, 'click');
            parser.skipEvent();
        })
        .on(`-${tagClick}`, function() {  // Equal to [/wait]
            parser.skipEvent();
        })
}

var Wait = function(name?: any) {
    this.typeWriter.wait(name);  // this: textPlayer
}

var AppendCommand = function(textPlayer?: any, name?: any) {
    AppendCommandBase.call(textPlayer,
        'wait',       // name
        Wait,         // callback
        name,         // params
        textPlayer,   // scope
    );
}

export default OnParseWaitTag;