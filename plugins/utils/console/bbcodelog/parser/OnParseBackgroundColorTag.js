var OnParseBackgroundColorTag = function (parser) {
    parser
        .on('+bgcolor', function (color) {
            parser.addStyle('background-color', color);
            parser.skipEvent();
        })
        .on('-bgcolor', function () {
            parser.removeStyle('background-color');
            parser.skipEvent();
        })
}

export default OnParseBackgroundColorTag;