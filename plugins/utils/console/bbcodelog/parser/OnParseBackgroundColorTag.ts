var OnParseBackgroundColorTag = function(parser?: any) {
    parser
        .on('+bgcolor', function(color?: any) {
            parser.addStyle('background-color', color);
            parser.skipEvent();
        })
        .on('-bgcolor', function() {
            parser.removeStyle('background-color');
            parser.skipEvent();
        })
}

export default OnParseBackgroundColorTag;