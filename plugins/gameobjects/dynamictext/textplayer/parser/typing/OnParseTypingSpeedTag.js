import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseTypingSpeedTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.speed', 'speed');
    var defaultSpeed;
    parser
        .on('start', function () {
            defaultSpeed = textPlayer.typeWriter.speed;
        })
        .on(`+${tagName}`, function (speed) {
            AppendCommand(textPlayer, speed);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommand(textPlayer, defaultSpeed);
            parser.skipEvent();
        })
        .on('complete', function () {
            textPlayer.typeWriter.speed = defaultSpeed;
        })
}

var SetSpeed = function(speed) {
    this.typeWriter.setSpeed(speed);  // this: textPlayer
}

var AppendCommand = function (textPlayer, speed) {
    AppendCommandBase.call(textPlayer,
        'speed',      // name
        SetSpeed,     // callback
        speed,        // params
        textPlayer,   // scope
    );
}

export default OnParseTypingSpeedTag;