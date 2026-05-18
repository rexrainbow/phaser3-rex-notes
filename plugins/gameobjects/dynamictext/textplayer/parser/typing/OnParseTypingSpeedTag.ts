import AppendCommandBase from '../../../dynamictext/methods/AppendCommand';

var OnParseTypingSpeedTag = function(textPlayer?: any, parser?: any, config?: any) {
    var tagName = 'speed';
    parser
        .on(`+${tagName}`, function(speed?: any) {
            AppendCommand(textPlayer, speed);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function() {
            AppendCommand(textPlayer, undefined);
            parser.skipEvent();
        })
}

var SetTypingSpeed = function(speed?: any) {
    this.typeWriter.setTypingSpeed(speed);  // this: textPlayer
}

var AppendCommand = function(textPlayer?: any, speed?: any) {
    AppendCommandBase.call(textPlayer,
        'speed',         // name
        SetTypingSpeed,  // callback
        speed,           // params
        textPlayer,      // scope
    );
}

export default OnParseTypingSpeedTag;