var IsCallMethodTag = function (tags, prefix) {
    // text.name.methodName
    return (tags.length === 3) && (tags[0] === prefix);
}

var OnParseCallTextMethodTag = function (tagPlayer, parser, config) {
    var prefix = 'text';
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [text.name.methodName=value0,value1,value2...]
            var tags = tag.split('.');
            var name, methodName;
            if (IsCallMethodTag(tags, prefix)) {
                name = tags[1];
                methodName = tags[2];
            } else {
                return;
            }
            if (!tagPlayer.textManager.hasMethod(name, methodName)) {
                return;
            }
            tagPlayer.textManager.call(name, methodName, ...parameters);

            parser.skipEvent();
        })
}

export default OnParseCallTextMethodTag;