var OnParseItalicTag = function (parser) {
    parser
        .on('+i', function () {
            parser.addStyle('font-style', 'italic');
            parser.skipEvent();
        })
        .on('-i', function () {
            parser.removeStyle('font-style');
            parser.skipEvent();
        })
}

export default OnParseItalicTag;