var ParseColorTag = function (parser) {
    parser
        .on('+color', function (color) {
            parser.addStyle(`color: ${color};`);
        })
        .on('-color', function () {
            parser.addStyle('color: inherit;');
        })
}

export default ParseColorTag;