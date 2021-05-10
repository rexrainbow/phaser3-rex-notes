var OnParseCustomTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.emit('parser.start', parser);
        })
        .on('+', function (tagName, value) {
            dynamicText.emit(`parser.+${tagName}`, value, parser);
        })
        .on('-', function (tagName) {
            dynamicText.emit(`parser.-${tagName}`, parser);
        })
        .on('complete', function () {
            dynamicText.emit('parser.complete', parser);
        })
}

export default OnParseCustomTag;