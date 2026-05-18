var OnParseFontFamilyTag = function(parser?: any) {
    parser
        .on('+family', function(family?: any) {
            parser.addStyle('font-family', family);
            parser.skipEvent();
        })
        .on('-family', function() {
            parser.removeStyle('font-family');
            parser.skipEvent();
        })
}

export default OnParseFontFamilyTag;