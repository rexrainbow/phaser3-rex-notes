import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseTypingSpeedTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            var speed = dynamicText.defaultTypingSpeed;
            AppendCommand(dynamicText, speed);
        })
        .on('+speed', function (speed) {
            AppendCommand(dynamicText, speed);
        })
        .on('-speed', function () {
            var speed = dynamicText.defaultTypingSpeed;
            AppendCommand(dynamicText, speed);
        })
}

var AppendCommand = function(dynamicText, speed) {
    var typeWriter = dynamicText.typeWriter;
    AppendCommandBase.call(dynamicText,
        'speed',                    // name
        typeWriter.setTypingSpeed,  // callback
        typeWriter,                 // scope
        speed,                      // params
    );
}

export default OnParseTypingSpeedTag;