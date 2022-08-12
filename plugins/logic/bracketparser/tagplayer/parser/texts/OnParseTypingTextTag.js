var OnParseTypingTextTag = function (tagPlayer, parser, config) {    
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