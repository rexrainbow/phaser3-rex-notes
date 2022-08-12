var IsChainAnimationTag = function (tags, prefix) {
    // prefix.name.chain 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'chain');
}

var OnParseChainAnimationTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsChainAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            gameObjectManager.chainAnimation(name, keys);

            parser.skipEvent();
        })
}

export default OnParseChainAnimationTag;