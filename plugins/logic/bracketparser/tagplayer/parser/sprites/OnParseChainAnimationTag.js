var IsChainAnimationTag = function (tags, prefix) {
    // sprite.name.chain 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'chain');
}

var OnParseChainAnimationTag = function (tagPlayer, parser, config) {
    var prefix = 'sprite';
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsChainAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            tagPlayer.spriteManager.chainAnimation(name, keys);

            parser.skipEvent();
        })
}

export default OnParseChainAnimationTag;