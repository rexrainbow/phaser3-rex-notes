var OnParseTypingSpeedTag = function (dynamicText, parser) {
    var typingSpeed;
    parser
        .on('start', function () {
            typingSpeed = dynamicText.defaultTypingSpeed;
        })
        .on('+speed', function (speed) {
            typingSpeed = speed;
        })
        .on('-speed', function () {
            typingSpeed = dynamicText.defaultTypingSpeed;
        })
        .on('post-content', function () {
            var children = dynamicText.getLastAppendedChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].setData('speed', typingSpeed);
            }
        })
}

export default OnParseTypingSpeedTag;