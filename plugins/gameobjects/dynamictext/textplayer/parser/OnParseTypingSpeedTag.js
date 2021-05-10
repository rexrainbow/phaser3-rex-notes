import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseTypingSpeedTag = function (dynamicText, parser) {
    var defaultSpeed;
    parser
        .on('start', function () {
            defaultSpeed = dynamicText.typeWriter.speed;
        })
        .on('+speed', function (speed) {
            AppendCommand(dynamicText, speed);
            parser.skipEvent();
        })
        .on('-speed', function () {
            AppendCommand(dynamicText, defaultSpeed);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.typeWriter.speed = defaultSpeed;
        })
}

var AppendCommand = function (dynamicText, speed) {
    var typeWriter = dynamicText.typeWriter;
    AppendCommandBase.call(dynamicText,
        'speed',                    // name
        typeWriter.setSpeed,        // callback
        speed,                      // params
        typeWriter,                 // scope
    );
}

export default OnParseTypingSpeedTag;