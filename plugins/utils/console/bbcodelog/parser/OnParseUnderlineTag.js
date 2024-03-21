var OnParseUnderlineTag = function (parser) {
    parser
        .on('+u', function () {
            parser.addStyle('text-decoration', 'underline');
            parser.skipEvent();
        })
        .on('-u', function () {
            parser.removeStyle('text-decoration');
            parser.skipEvent();
        })
}

export default OnParseUnderlineTag;