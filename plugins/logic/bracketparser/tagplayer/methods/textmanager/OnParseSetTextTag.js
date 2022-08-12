var OnParseSetTextTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);

    // [prefix.name.text] -> event : 'prefix.text'    
    tagPlayer.on(`${prefix}.text`, function (name) {
        // Clear text
        gameObjectManager.clearText(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            gameObjectManager.appendText(name, content);
        });
    });
}

export default OnParseSetTextTag;