var OnParseBoldTag = function (dynamicText, parser) {
    parser
        .on('start', function () {
            dynamicText.textStyle.setBold(false);
        })
        .on('+b', function () {
            dynamicText.textStyle.setBold(true);
        })
        .on('-b', function () {
            dynamicText.textStyle.setBold(false);
        })
}

export default OnParseBoldTag;