import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseTypingSpeedTag = function (dynamicText, parser) {
    var defaultTypingSpeed;
    parser
        .on('start', function () {
            defaultTypingSpeed = dynamicText.typeWriter.typingSpeed;
        })
        .on('+speed', function (speed) {
            AppendCommand(dynamicText, speed);
        })
        .on('-speed', function () {
            AppendCommand(dynamicText, defaultTypingSpeed);
        })
        .on('complete', function () {
            dynamicText.typeWriter.typingSpeed = defaultTypingSpeed;
        })
}

var AppendCommand = function (dynamicText, speed) {
    var typeWriter = dynamicText.typeWriter;
    AppendCommandBase.call(dynamicText,
        'speed',                    // name
        typeWriter.setTypingSpeed,  // callback
        speed,                      // params
        typeWriter,                 // scope        
    );
}

export default OnParseTypingSpeedTag;