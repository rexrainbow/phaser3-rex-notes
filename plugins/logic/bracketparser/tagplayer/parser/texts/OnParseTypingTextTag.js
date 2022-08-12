var IsTypingTextTag = function (tags, prefix) {
    // text.name.typing
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'typing');
}

var OnParseTypingTextTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    // [text.name.typing] -> event : 'text.typing'    
    tagPlayer.on('text.typing', function (name, speed) {
        // Clear text
        tagPlayer.textManager.clearTyping(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            if (speed !== undefined) {
                tagPlayer.textManager.setTypingSpeed(name, speed);
            }
            tagPlayer.textManager.typing(name, content);
        });
    });
}

export default OnParseTypingTextTag;