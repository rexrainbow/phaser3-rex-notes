var OnParseTypingTextTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);

    // [prefix.name.typing] -> event : 'prefix.typing'    
    tagPlayer.on(`${prefix}.typing`, function (name, speed) {
        // Clear text
        gameObjectManager.clearTyping(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            if (speed !== undefined) {
                gameObjectManager.setTypingSpeed(name, speed);
            }
            gameObjectManager.typing(name, content);
        });
    });
}

export default OnParseTypingTextTag;