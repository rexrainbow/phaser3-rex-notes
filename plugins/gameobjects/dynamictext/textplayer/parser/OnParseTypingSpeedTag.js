import AppendCommandBase from '../../dynamictext/methods/AppendCommand.js';

var OnParseTypingSpeedTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            var speed = dynamicText.defaultTypingSpeed;
            AppendCommandBase.call(dynamicText, 'speed', { speed: speed });
        })
        .on('+speed', function (speed) {
            AppendCommandBase.call(dynamicText, 'speed', { speed: speed });
        })
        .on('-speed', function () {
            var speed = dynamicText.defaultTypingSpeed;
            AppendCommandBase.call(dynamicText, 'speed', { speed: speed });
        })
}

export default OnParseTypingSpeedTag;