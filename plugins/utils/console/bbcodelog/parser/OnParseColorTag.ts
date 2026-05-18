var OnParseColorTag = function(parser?: any) {
    parser
        .on('+color', function(color?: any) {
            parser.addStyle('color', color);
            parser.skipEvent();
        })
        .on('-color', function() {
            parser.removeStyle('color');
            parser.skipEvent();
        })
}

export default OnParseColorTag;