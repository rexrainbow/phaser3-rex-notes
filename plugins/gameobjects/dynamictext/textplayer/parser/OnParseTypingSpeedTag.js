import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseTypingSpeedTag = function (dynamicText, parser, config) {
    var tagName = GetValue(config, 'tags.speed', 'speed');
    var defaultSpeed;
    parser
        .on('start', function () {
            defaultSpeed = dynamicText.typeWriter.speed;
        })
        .on(`+${tagName}`, function (speed) {
            AppendCommand(dynamicText, speed);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommand(dynamicText, defaultSpeed);
            parser.skipEvent();
        })
        .on('complete', function () {
            dynamicText.typeWriter.speed = defaultSpeed;
        })
}

var SetSpeed = function(speed) {
    this.setSpeed(speed);  // typeWriter.setSpeed(speed)
}

var AppendCommand = function (dynamicText, speed) {
    AppendCommandBase.call(dynamicText,
        'speed',                 // name
        SetSpeed,                // callback
        speed,                   // params
        dynamicText.typeWriter,  // scope
    );
}

export default OnParseTypingSpeedTag;