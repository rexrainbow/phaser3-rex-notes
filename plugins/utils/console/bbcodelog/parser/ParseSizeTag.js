var ParseSizeTag = function (parser) {
    parser
        .on('+size', function (size) {
            if (typeof (size) === 'number') {
                size = `${size}px`
            }
            parser.addStyle('font-size', size);
        })
        .on('-size', function () {
            parser.removeStyle('font-size');
        })
}

export default ParseSizeTag;