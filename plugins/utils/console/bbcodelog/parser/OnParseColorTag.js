var OnParseColorTag = function (parser) {
    parser
        .on('+color', function (color) {
            parser.addStyle('color', color);
            parser.skipEvent();
        })
        .on('-color', function () {
            parser.removeStyle('color');
            parser.skipEvent();
        })
}

export default OnParseColorTag;