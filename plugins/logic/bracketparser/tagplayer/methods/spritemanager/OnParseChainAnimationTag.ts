var IsChainAnimationTag = function(tags?: any, goType?: any) {
    // goType.name.chain 
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'chain');
}

var OnParseChainAnimationTag = function(tagPlayer?: any, parser?: any, config?: any) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on('+', function(tag?: any) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsChainAnimationTag(tags, goType)) {
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