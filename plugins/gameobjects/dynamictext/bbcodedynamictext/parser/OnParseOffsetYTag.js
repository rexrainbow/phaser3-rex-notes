var OnParseOffsetYTag = function (dynamicText, parser) {
    parser
        .on('+y', function (y) {
            if (y === undefined) {
                y = dynamicText.defaultTextStyle.offsetY;
            }
            dynamicText.textStyle.setOffsetY(y);
        })
        .on('-y', function () {
            dynamicText.textStyle.setOffsetY(0);
        })
}

export default OnParseOffsetYTag;