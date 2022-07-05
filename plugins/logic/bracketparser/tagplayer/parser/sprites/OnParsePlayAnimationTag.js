var IsPlayAnimationTag = function (tags, prefix) {
    // sprite.name.play
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'play');
}

var IsStopAnimationTag = function (tags, prefix) {
    // sprite.name.stop
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'stop');
}

var OnParsePlayAnimationTag = function (tagPlayer, parser, config) {
    var prefix = 'sprite';
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.play=key], or [sprite.name.play=key0,key1,...]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            var firstKey = keys.shift();
            tagPlayer.spriteManager.playAnimation(name, firstKey);
            if (keys.length > 0) {
                tagPlayer.spriteManager.chainAnimation(name, keys);
            }

            parser.skipEvent();
        })
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.stop]
            var tags = tag.split('.');
            var name;
            if (IsStopAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.spriteManager.stopAnimation(name);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/sprite.name.play]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.spriteManager.stopAnimation(name);

            parser.skipEvent();
        })
}

export default OnParsePlayAnimationTag;