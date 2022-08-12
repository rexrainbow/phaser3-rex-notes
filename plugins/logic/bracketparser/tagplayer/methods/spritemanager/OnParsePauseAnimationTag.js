var IsPauseAnimationTag = function (tags, prefix) {
    // prefix.name.pause 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'pause');
}

var OnParsePauseAnimationTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name.pause=key]
            var tags = tag.split('.');
            var name;
            if (IsPauseAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            gameObjectManager.pauseAnimation(name);

            parser.skipEvent();
        })
}

export default OnParsePauseAnimationTag;