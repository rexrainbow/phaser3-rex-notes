import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OnParseTypingSpeedTag = function (textPlayer, parser, config) {
    var tagName = GetValue(config, 'tags.speed', 'speed');
    parser
        .on(`+${tagName}`, function (speed) {
            AppendCommand(textPlayer, speed);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommand(textPlayer, undefined);
            parser.skipEvent();
        })
}

var SetTypingSpeed = function (speed) {
    this.typeWriter.setTypingSpeed(speed);  // this: textPlayer
}

var AppendCommand = function (textPlayer, speed) {
    AppendCommandBase.call(textPlayer,
        'speed',         // name
        SetTypingSpeed,  // callback
        speed,           // params
        textPlayer,      // scope
    );
}

export default OnParseTypingSpeedTag;