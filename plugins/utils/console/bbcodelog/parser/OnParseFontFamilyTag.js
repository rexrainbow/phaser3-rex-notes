var OnParseFontFamilyTag = function (parser) {
    parser
        .on('+family', function (family) {
            parser.addStyle('font-family', family);
            parser.skipEvent();
        })
        .on('-family', function () {
            parser.removeStyle('font-family');
            parser.skipEvent();
        })
}

export default OnParseFontFamilyTag;