var OnParseSetTextTag = function (tagPlayer, parser, config) {    
    // [text.name.text] -> event : 'text.text'    
    tagPlayer.on('text.text', function (name) {
        // Clear text
        tagPlayer.textManager.clearText(name);
        // Append text
        tagPlayer.setContentCallback(function (content) {
            tagPlayer.textManager.appendText(name, content);
        });
    });
}

export default OnParseSetTextTag;