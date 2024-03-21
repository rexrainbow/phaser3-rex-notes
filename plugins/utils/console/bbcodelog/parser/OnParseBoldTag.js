var ParseBoldTag = function (parser) {
    parser
        .on('+b', function () {
            parser.addStyle('font-weight', 'bold');
            parser.skipEvent();
        })
        .on('-b', function () {
            parser.removeStyle('font-weight');
            parser.skipEvent();
        })
}

export default ParseBoldTag;