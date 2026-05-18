var OnParseSetTextTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.text] -> event : 'goType.text'    
    tagPlayer.on(`${goType}.text`, function(name?: any) {
        // Clear text
        gameObjectManager.clearText(name);
        // Append text
        tagPlayer.setContentCallback(function(content?: any) {
            gameObjectManager.appendText(name, content);
        });
    });
}

export default OnParseSetTextTag;