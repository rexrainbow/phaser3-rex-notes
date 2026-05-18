var OnParseTypingTextTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.typing] -> event : 'goType.typing'    
    tagPlayer.on(`${goType}.typing`, function(name?: any, speed?: any) {
        // Clear text
        gameObjectManager.clearTyping(name);
        // Append text
        tagPlayer.setContentCallback(function(content?: any) {
            if (speed !== undefined) {
                gameObjectManager.setTypingSpeed(name, speed);
            }
            gameObjectManager.typing(name, content);
            // see \plugins\utils\text\textmanager\TextBob.js
        });
    });
}

export default OnParseTypingTextTag;