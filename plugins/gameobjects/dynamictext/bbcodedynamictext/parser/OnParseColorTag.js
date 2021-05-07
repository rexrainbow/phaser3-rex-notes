var OnParseColorTag = function (dynamicText, parser) {
    parser
        .on('+color', function (color) {
            if (typeof (color) === 'string') {
                color = parseInt(color.replace(/#|0x/, ''), 16);
            }
            dynamicText.modifyTextStyle({ color: color });
        })
        .on('-color', function () {
            var color = dynamicText.defaultTextStyle.color;
            dynamicText.modifyTextStyle({ color: color });
        })
}

export default OnParseColorTag;