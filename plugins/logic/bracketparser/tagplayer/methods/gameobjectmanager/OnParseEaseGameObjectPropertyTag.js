var EaseMode = {
    to: true,
    yoyo: true
}

var IsEasePropertyTag = function (tags, goType) {
    // goType.name.prop.to, or goType.name.prop.yoyo
    return (tags.length === 4) && (tags[0] === goType) && EaseMode[tags[3]];
}

var OnParseEaseGameObjectPropertyTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.prop.to=value,duration]
            // [goType.name.prop.to=value,duration,ease,repeat]
            // [goType.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, goType)) {
                name = tags[1];
                property = tags[2];
                isYoyo = (tags[3] === 'yoyo');
            } else {
                return;
            }

            if (typeof (ease) === 'number') {
                repeat = ease;
                ease = undefined;
            }

            gameObjectManager.easeProperty(
                name, property, value,
                duration, ease, repeat, isYoyo
            );

            parser.skipEvent();
        })
}

export default OnParseEaseGameObjectPropertyTag;