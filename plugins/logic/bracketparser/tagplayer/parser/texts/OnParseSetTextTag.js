var IsSetTextTag = function (tags, prefix) {
    // text.name.text
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'text');
}

var OnParseSetTextTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
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