var OnParseBoldTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.textStyle.setBold(false);
        })
        .on('+b', function () {
            dynamicText.textStyle.setBold(true);
            parser.skipEvent();
        })
        .on('-b', function () {
            dynamicText.textStyle.setBold(false);
            parser.skipEvent();
        })
}

export default OnParseBoldTag;