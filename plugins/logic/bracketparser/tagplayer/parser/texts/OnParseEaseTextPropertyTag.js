var EaseMode = {
    to: true,
    yoyo: true
}

var IsEasePropertyTag = function (tags, prefix) {
    // text.name.prop.to, or text.name.prop.yoyo
    return (tags.length === 4) && (tags[0] === prefix) && EaseMode[tags[3]];
}

var OnParseEaseTextPropertyTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    if (!prefix) {
        return;
    }
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name.prop.to=value,duration]
            // [text.name.prop.to=value,duration,ease,repeat]
            // [text.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, prefix)) {
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

            tagPlayer.textManager.easeProperty(
                name, property, value,
                duration, ease, repeat, isYoyo
            );

            parser.skipEvent();
        })
}

export default OnParseEaseTextPropertyTag;