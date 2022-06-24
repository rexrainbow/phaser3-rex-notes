const ParseCallbacks = [
];

var AddParseCallbacks = function (textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
        ParseCallbacks[i](textPlayer, parser, config);
    }
}

export default AddParseCallbacks;